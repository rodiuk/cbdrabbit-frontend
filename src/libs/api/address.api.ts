"use server";

import prisma from "@/libs/client/prisma.client";
import { IAddressData } from "@/interfaces/adress.interface";

export const getUserAddress = async (userId: string) => {
  try {
    const address = await prisma.address.findUnique({
      where: {
        userId,
      },
    });

    return address;
  } catch (error) {
    throw error;
  }
};

export const createUserAddress = async (
  userId: string,
  addressData: IAddressData
) => {
  try {
    const address = await prisma.address.create({
      data: { ...addressData, user: { connect: { id: userId } } },
    });

    return address;
  } catch (error) {
    throw error;
  }
};

export const updateUserAddress = async (
  userId: string,
  addressData: IAddressData
) => {
  try {
    const isAddressExist = await prisma.address.findUnique({
      where: {
        userId,
      },
    });

    if (!isAddressExist) {
      return createUserAddress(userId, addressData);
    }

    const address = await prisma.address.update({
      where: {
        userId,
      },
      data: { ...addressData },
    });

    return address;
  } catch (error) {
    throw error;
  }
};
