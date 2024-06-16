import { Prisma } from "@prisma/client";

const orderBaseSelect: Prisma.OrderSelect = {
  id: true,
  totalSum: true,
  comment: true,
  itemPrice: true,
  status: true,
  createdAt: true,
  checkId: true,
  utm_campaign: true,
  utm_content: true,
  utm_medium: true,
  utm_source: true,
  utm_term: true,
  lang: true,
  firstOrder: true,
  promocode: {
    select: {
      code: true,
    },
  },
  user: {
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      address: {
        select: {
          id: true,
          city: true,
          npDeliveryType: true,
          npDepartment: true,
          phoneNumber: true,
        },
      },
    },
  },
};

export const orderSelect: Prisma.OrderSelect = {
  ...orderBaseSelect,
  orderItems: {
    select: {
      id: true,
      quantity: true,
      product: {
        select: {
          id: true,
          productName: true,
          price: true,
          images: {
            select: {
              url: true,
            },
          },
        },
      },
    },
  },
};

export const changedOrderStatusSelect: Prisma.OrderSelect = {
  ...orderBaseSelect,
  orderItems: {
    select: {
      id: true,
      quantity: true,
      product: {
        select: {
          id: true,
          productName: true,
          price: true,
        },
      },
    },
  },
};
