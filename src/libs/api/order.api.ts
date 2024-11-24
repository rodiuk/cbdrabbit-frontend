"use server";

import prisma from "@/libs/client/prisma.client";
import { changedOrderStatusSelect, orderSelect } from "./selects/order.select";
import { IOrderCreate, IUserOrder } from "@/interfaces/order.interface";
import { updateUserAddress } from "./address.api";
import {
  createUser,
  updateUserLoyalty,
  updateUserTotalAmount,
} from "./user.api";
import { OrderStatus } from "@prisma/client";
import { nanoid } from "nanoid";
import {
  orderInProgressEmail,
  sendWebhook,
  senPasswordNewUserEmail,
} from "./emails.api";
import { getProductsByIds } from "./products.api";

export const getAllUserOrders = async (
  userId: string
): Promise<IUserOrder[]> => {
  try {
    const orders = await prisma.order.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
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

export const getOrderByCheckId = async (checkId: number) => {
  try {
    const order = await prisma.order.findUnique({
      where: {
        checkId,
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
  paymentId: string,
  lang?: string
) => {
  try {
    let firstOrder = false;

    if (!orderData?.userId && !!orderData?.address?.phoneNumber) {
      firstOrder = true;
      const password = nanoid(6);
      const user = await createUser(
        {
          email: orderData.email,
          password,
          phoneNumber: orderData.address?.phoneNumber,
          firstName: orderData.firstName,
          lastName: orderData.lastName,
          acceptedSignUp: orderData.acceptedSignUp,
        },
        true
      );

      if ("id" in user) {
        orderData.userId = user.id;
        await updateUserAddress(user.id, orderData.address);

        if (orderData.acceptedSignUp) {
          await updateUserTotalAmount(user.id, orderData.totalSum);
          await senPasswordNewUserEmail(
            user.id,
            user.email,
            orderData?.address?.phoneNumber,
            orderData.firstName,
            orderData?.lastName,
            password,
            lang
          );
        }
      }
    } else {
      await updateUserAddress(orderData.userId!, orderData.address);
      await updateUserTotalAmount(orderData.userId!, orderData.totalSum);
      const res = await hasUserOrders(orderData.userId!);
      if (!res) firstOrder = res;
    }

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
        ...(!!orderData.promocodeId && {
          promocode: {
            connect: {
              id: orderData.promocodeId,
            },
          },
        }),
        ...(lang && { lang: lang }),
        ...(orderData.utm_campaign && { utm_campaign: orderData.utm_campaign }),
        ...(!!firstOrder && { firstOrder: firstOrder }),
        ...(orderData.utm_source && { utm_source: orderData.utm_source }),
        ...(orderData.utm_medium && { utm_medium: orderData.utm_medium }),
        ...(orderData.utm_term && { utm_term: orderData.utm_term }),
        ...(orderData.utm_content && { utm_content: orderData.utm_content }),
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

    await sendWebhook(order);

    return order;
  } catch (error) {
    throw error;
  }
};

export const changeOrderStatusByCheckId = async (
  checkId: number,
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
    const existOrder = await getOrderByCheckId(checkId);

    if (!existOrder) throw new Error("Order not found");

    if (existOrder.status !== status) {
      existOrder.status = status;
      await sendWebhook(existOrder);
    }

    if (status === OrderStatus.PAID) {
      const orderProducts = await getProductsByIds(
        existOrder.orderItems.map(item => item.productId)
      );
      await updateUserLoyalty(existOrder.user.id);
      await orderInProgressEmail(
        existOrder.user.id,
        existOrder as any,
        orderProducts || [],
        !!existOrder.firstOrder,
        String(existOrder?.checkId),
        existOrder.lang || "uk"
      );
    }

    const order = await prisma.order.update({
      where: {
        checkId,
      },
      data: {
        status,
      },
      select: changedOrderStatusSelect,
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

export const hasUserOrders = async (userId: string) => {
  try {
    const ordersCount = await prisma.order.count({
      where: {
        userId,
      },
    });

    return ordersCount > 0;
  } catch (error) {
    throw error;
  }
};
