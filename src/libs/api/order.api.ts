"use server";

import prisma from "@/libs/client/prisma.client";
import { orderSelect } from "./selects/order.select";
import { IOrderCreate } from "@/interfaces/order.interface";
import { updateUserAddress } from "./address.api";
import { updateUserTotalAmount } from "./user.api";

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

export const createOrder = async (orderData: IOrderCreate) => {
  try {
    await updateUserAddress(orderData.userId, orderData.address);
    await updateUserTotalAmount(orderData.userId, orderData.totalSum);

    const order = await prisma.order.create({
      data: {
        totalSum: orderData.totalSum,
        itemPrice: orderData.itemPrice,
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
