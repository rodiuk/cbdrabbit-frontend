"use server";

import {
  ICreateUser,
  IUpdateDeliveryInfo,
  IUserData,
} from "@/interfaces/user.interface";
import prisma from "@/libs/client/prisma.client";
import { compare, hash } from "bcrypt";
import { nanoid } from "nanoid";
import { revalidatePath } from "next/cache";
import {
  emailUpdateSendEmail,
  passwordResetSendEmail,
  updateContactInSendPulse,
  signUpActivateSendEmail,
} from "./emails.api";
import { Prisma, User } from "@prisma/client";

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

export const getUserById = async (
  userId: string,
  select?: Prisma.UserSelect
) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      ...(!!select && { select }),
    });

    return user;
  } catch (error) {
    throw error;
  }
};

export const userByOrderId = async (orderId: number) => {
  try {
    const order = await prisma.order.findFirst({
      where: {
        checkId: +orderId,
      },
    });

    if (!order) return null;

    const user = await prisma.user.findUnique({
      where: {
        id: order.userId,
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
        acceptedSignUp: true,
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
        isVerified: true,
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

    updateContactInSendPulse(
      userData.email,
      user?.isPromo,
      userData?.firstName,
      userData?.lastName,
      user?.isVerified
    );

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

export const createUser = async (
  userData: ICreateUser,
  isVerified?: boolean
) => {
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

      if (isUserExist && isUserExist?.acceptedSignUp) return isUserExist;

      if (isUserExist && userData?.acceptedSignUp === false) {
        const user = await prisma.user.update({
          where: {
            email: userData.email,
          },
          data: {
            acceptedSignUp: false,
            password: hashPassword,
            ...(!!userData?.firstName && { firstName: userData.firstName }),
            ...(!!userData?.lastName && { lastName: userData.lastName }),
            ...(userData?.phoneNumber?.length > 0 && {
              address: {
                update: {
                  phoneNumber: userData.phoneNumber,
                },
              },
            }),
          },
        });

        return user;
      }

      const code = nanoid(16);
      let user: User | null = null;

      if (isUserExist && userData?.acceptedSignUp === true) {
        user = await prisma.user.update({
          where: {
            email: userData.email,
          },
          data: {
            email: userData.email,
            password: hashPassword,
            ...(!!userData?.firstName && { firstName: userData.firstName }),
            ...(!!userData?.lastName && { lastName: userData.lastName }),
            verifiedCode: code,
            acceptedSignUp: true,
            isVerified: isVerified ? true : false,
            loyalty: { update: { percentDiscount: 2 } },
            ...(userData?.phoneNumber?.length > 0 && {
              address: {
                update: {
                  phoneNumber: userData.phoneNumber,
                },
              },
            }),
          },
        });
      } else {
        user = await prisma.user.create({
          data: {
            email: userData.email,
            password: hashPassword,
            ...(!!userData?.firstName && { firstName: userData.firstName }),
            ...(!!userData?.lastName && { lastName: userData.lastName }),
            verifiedCode: code,
            acceptedSignUp: userData.acceptedSignUp,
            isVerified: isVerified ? true : false,
            loyalty: { create: { percentDiscount: 2 } },
            ...(userData?.phoneNumber?.length > 0 && {
              address: {
                create: {
                  phoneNumber: userData.phoneNumber,
                },
              },
            }),
          },
        });
      }

      updateContactInSendPulse(
        user.email,
        user.isPromo,
        user?.firstName,
        user?.lastName,
        user?.isVerified
      );

      if (!isVerified) {
        signUpActivateSendEmail(
          user.email,
          userData.phoneNumber,
          user.id,
          code,
          userData?.firstName,
          userData?.lastName
        );
      }

      return user;
    });

    return user;
  } catch (error) {
    throw error;
  }
};

export const updateEmailRequest = async (
  oldEmail: string,
  newEmail: string,
  lang: string
) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: oldEmail,
      },
    });

    if (!user) return { error: "User not found" };

    const code = nanoid(16);

    await prisma.user.update({
      where: {
        email: oldEmail,
      },
      data: {
        successCode: code,
      },
    });

    await emailUpdateSendEmail(newEmail, user, code, lang);

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

    updateContactInSendPulse(
      user.email,
      user.isPromo,
      user?.firstName,
      user?.lastName,
      user?.isVerified
    );

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
          upsert: {
            where: {
              userId: userId,
            },
            update: {
              phoneNumber: data.phoneNumber,
              city: data.city,
              npDepartment: data.npDepartment,
              npDeliveryType: data.npDeliveryType,
            },
            create: {
              phoneNumber: data.phoneNumber,
              city: data.city,
              npDepartment: data.npDepartment,
              npDeliveryType: data.npDeliveryType,
            },
          },
        },
      },
      select: {
        email: true,
        firstName: true,
        lastName: true,
        password: true,
        address: true,
        isVerified: true,
        isPromo: true,
      },
    });

    updateContactInSendPulse(
      user?.email,
      user.isPromo,
      user?.firstName,
      user?.lastName,
      user?.isVerified,
      user.address?.phoneNumber
    );

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
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        isActive: false,
      },
    });
  } catch (error) {
    throw error;
  }
};

export const updateUserTotalAmount = async (
  userId: string,
  orderAmount: number
) => {
  try {
    const user = await getUserById(userId);

    if (!user) return { error: "User not found" };

    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        totalOrdersAmount: +user?.totalOrdersAmount + orderAmount,
      },
    });
  } catch (error) {
    throw error;
  }
};

export const checkVerifiedCode = async (code: string) => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        verifiedCode: code,
      },
    });

    if (!user) return { error: "User not found" };

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        isVerified: true,
      },
    });

    updateContactInSendPulse(
      user.email,
      user.isPromo,
      user?.firstName,
      user?.lastName,
      true
    );

    return user;
  } catch (error) {
    throw error;
  }
};

export const resetPasswordService = async (email: string, lang: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) return { error: "User not found" };

    const code = nanoid();

    const updateUser = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        successCode: code,
      },
    });

    await passwordResetSendEmail(email, user, code, lang);

    return updateUser;
  } catch (error) {
    throw error;
  }
};

export const updatePasswordByCode = async (code: string, password: string) => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        successCode: code,
      },
    });

    if (!user) return { error: "User not found" };

    const hashNewPassword = await hash(password, 10);

    const updateUser = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        password: hashNewPassword,
        successCode: null,
      },
    });

    return updateUser;
  } catch (error) {
    throw error;
  }
};

export const updateUserLoyalty = async (userId: string) => {
  try {
    const user = (await getUserById(userId, {
      id: true,
      totalOrdersAmount: true,
      loyalty: {
        select: {
          id: true,
          percentDiscount: true,
        },
      },
    })) as User & { loyalty: { id: string; percentDiscount: number } };

    if (!user) return { error: "User not found" };

    let newDiscount: number = user?.loyalty?.percentDiscount;

    const userAmount = +user?.totalOrdersAmount?.toFixed(0) || 0;

    switch (true) {
      case userAmount >= 7000:
        newDiscount = 12;
        break;
      case userAmount >= 5000:
        newDiscount = 10;
        break;
      case userAmount >= 3000:
        newDiscount = 7;
        break;
      case userAmount >= 1000:
        newDiscount = 5;
        break;
      default:
        break;
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        loyalty: {
          update: {
            percentDiscount: newDiscount,
          },
        },
      },
    });

    if (!updatedUser) return null;

    return updatedUser;
  } catch (error) {
    throw error;
  }
};
