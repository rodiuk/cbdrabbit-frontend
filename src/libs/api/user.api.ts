"use server";

import { ICreateUser, IUserData } from "@/interfaces/user.interface";
import prisma from "@/libs/client/prisma.client";
import { compare, compareSync, hash } from "bcrypt";

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
  userData: Omit<IUserData, "password">
) => {
  try {
    const user = await prisma.user.create({
      data: userData,
    });

    return user;
  } catch (error) {
    throw error;
  }
};

export const createUser = async (userData: ICreateUser) => {
  try {
    if (!userData?.password) throw new Error("Password is required");

    const hashPassword = await hash(userData.password, 10);
    userData.password = hashPassword;

    const user = await prisma.$transaction(async () => {
      const isUserExist = await prisma.user.findUnique({
        where: {
          email: userData.email,
        },
      });

      if (isUserExist) throw new Error("User already exist");

      const user = await prisma.user.create({
        data: userData,
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

      if (!isPasswordMatch) {
        throw new Error("Current password is incorrect");
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
