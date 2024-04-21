"use server";

import {
  ICreateUser,
  IUpdateDeliveryInfo,
  IUserData,
} from "@/interfaces/user.interface";
import prisma from "@/libs/client/prisma.client";
import { compare, hash } from "bcrypt";
import { revalidatePath } from "next/cache";

export const getUserByEmail = async (email: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  } catch (error) {
    throw error;
  }
};

export const checkIsUserExistByEmail = async (email: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    return !!user?.id;
  } catch (error) {
    throw error;
  }
};

export const createGoogleUser = async (
  userData: Pick<IUserData, "email" | "firstName" | "lastName">
) => {
  try {
    const user = await prisma.user.create({
      data: {
        ...userData,
        isActive: true,
        loyalty: {
          create: {
            percentDiscount: 2,
          },
        },
        address: {
          create: {},
        },
      },
    });

    return user;
  } catch (error) {
    throw error;
  }
};

export const getUserInfo = async (userId: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        email: true,
        role: true,
        firstName: true,
        lastName: true,
        totalOrdersAmount: true,
        password: true,
        address: true,
        loyalty: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return user;
  } catch (error) {
    throw error;
  }
};

export const createUser = async (userData: ICreateUser) => {
  try {
    if (!userData?.password) return { error: "Password is required" };

    const hashPassword = await hash(userData.password, 10);
    userData.password = hashPassword;

    const user = await prisma.$transaction(async () => {
      const isUserExist = await prisma.user.findUnique({
        where: {
          email: userData.email,
        },
      });

      if (isUserExist) return { error: "User already exist" };

      const user = await prisma.user.create({
        data: {
          ...userData,
          loyalty: { create: { percentDiscount: 2 } },
          address: { create: {} },
        },
      });

      return user;
    });

    return user;
  } catch (error) {
    throw error;
  }
};

export const updateEmail = async (userId: string, email: string) => {
  try {
    const user = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        email,
      },
    });

    return user;
  } catch (error) {
    throw error;
  }
};

export const updatePassword = async (
  userId: string,
  newPassword: string,
  currentPassword: string
) => {
  try {
    const transaction = await prisma.$transaction(async prisma => {
      const user = await prisma.user.findUnique({
        where: {
          id: userId,
        },
      });

      if (!user || !user?.password) {
        throw new Error("User not found");
      }

      const isPasswordMatch = await compare(currentPassword, user.password);

      if (!isPasswordMatch) return { error: "Current password is incorrect" };

      const hashNewPassword = await hash(newPassword, 10);

      const updatedUser = await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          password: hashNewPassword,
        },
      });

      return updatedUser;
    });

    return transaction;
  } catch (error) {
    throw error;
  }
};

export const createPassword = async (userId: string, newPassword: string) => {
  try {
    const transaction = await prisma.$transaction(async prisma => {
      const user = await prisma.user.findUnique({
        where: {
          id: userId,
        },
      });

      if (!user) {
        throw new Error("User not found");
      }

      const hashNewPassword = await hash(newPassword, 10);

      const updatedUser = await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          password: hashNewPassword,
        },
      });

      return updatedUser;
    });

    return transaction;
  } catch (error) {
    throw error;
  }
};

export const updateDeliveryInfo = async (
  userId: string,
  data: IUpdateDeliveryInfo
) => {
  try {
    const user = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        address: {
          update: {
            phoneNumber: data.phoneNumber,
            city: data.city,
            npDepartment: data.npDepartment,
            npDeliveryType: data.npDeliveryType,
          },
        },
      },
      select: {
        firstName: true,
        lastName: true,
        password: true,
        address: true,
      },
    });

    revalidatePath("profile");
    return user;
  } catch (error) {
    throw error;
  }
};

export const isAccountActivated = async (userEmail: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: userEmail,
      },
      select: {
        isActive: true,
      },
    });

    return user?.isActive ?? false;
  } catch (error) {
    throw error;
  }
};

export const deleteAccount = async (userId: string) => {
  try {
    await prisma.user.delete({
      where: {
        id: userId,
      },
    });
  } catch (error) {
    throw error;
  }
};
