"use server";

import prisma from "@/libs/client/prisma.client";
import { orderSelect } from "./selects/order.select";
import { IOrderCreate } from "@/interfaces/order.interface";
import { updateUserAddress } from "./address.api";
import { updateUserTotalAmount } from "./user.api";
import { OrderStatus } from "@prisma/client";
import { nanoid } from "nanoid";

export const getAllUserOrders = async (userId: string) => {
  try {
    const orders = await prisma.order.findMany({
      where: {
        userId,
      },
      select: orderSelect,
    });

    return orders;
  } catch (error) {
    throw error;
  }
};

export const getOrderById = async (orderId: string) => {
  try {
    const order = await prisma.order.findUnique({
      where: {
        id: orderId,
      },
      select: orderSelect,
    });

    return order;
  } catch (error) {
    throw error;
  }
};

export const createOrder = async (
  orderData: IOrderCreate,
  paymentId: string
) => {
  try {
    await updateUserAddress(orderData.userId, orderData.address);
    await updateUserTotalAmount(orderData.userId, orderData.totalSum);

    const order = await prisma.order.create({
      data: {
        totalSum: orderData.totalSum,
        itemPrice: orderData.itemPrice,
        paymentId,
        ...(orderData?.comment && { comment: orderData.comment }),
        user: {
          connect: {
            id: orderData.userId,
          },
        },
        orderItems: {
          create: orderData.items.map(item => ({
            quantity: item.quantity,
            product: {
              connect: {
                id: item.productId,
              },
            },
          })),
        },
      },
      select: orderSelect,
    });

    return order;
  } catch (error) {
    throw error;
  }
};

export const changeOrderStatusByInvoiceId = async (
  invoiceId: string,
  statusLabel: string
) => {
  let status: OrderStatus | null = null;

  if (statusLabel === "success") {
    status = OrderStatus.PAID;
  } else if (
    statusLabel === "failure" ||
    statusLabel === "reversed" ||
    statusLabel === "expired"
  ) {
    status = OrderStatus.CANCELED;
  } else {
    status = OrderStatus.CREATED;
  }

  try {
    const order = await prisma.order.update({
      where: {
        paymentId: invoiceId,
      },
      data: {
        status,
      },
      select: orderSelect,
    });

    return order;
  } catch (error) {
    throw error;
  }
};

export const getOrderNewReference = async () => {
  try {
    const res = await prisma.order.findFirst({
      orderBy: {
        createdAt: "desc",
      },
      select: {
        checkId: true,
      },
    });

    if (!res?.checkId) return nanoid(10);

    return String(+res?.checkId + 1);
  } catch (error) {}
};
