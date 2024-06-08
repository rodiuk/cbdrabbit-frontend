"use server";

import prisma from "@/libs/client/prisma.client";
import { IPromoCodeCreate } from "@/interfaces/promocode.interface";

export const findOnePromocode = async (code: string) => {
  try {
    const promocode = await prisma.promocode.findUnique({
      where: {
        code: code.toUpperCase(),
      },
    });

    return promocode;
  } catch (error) {
    throw error;
  }
};

export const createPromocode = async (payload: IPromoCodeCreate) => {
  try {
    const order = await prisma.promocode.create({
      data: { ...payload, code: payload.code.toUpperCase() },
    });

    return order;
  } catch (error) {
    throw error;
  }
};

export const deletePromocode = async (code: string) => {
  try {
    const promocode = await prisma.promocode.delete({
      where: {
        code,
      },
    });

    return promocode;
  } catch (error) {
    throw error;
  }
};
