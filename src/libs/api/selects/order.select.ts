import { Prisma } from "@prisma/client";

const orderBaseSelect: Prisma.OrderSelect = {
  id: true,
  totalSum: true,
  comment: true,
  itemPrice: true,
  status: true,
  checkId: true,
  utm_campaign: true,
  utm_content: true,
  utm_medium: true,
  utm_source: true,
  utm_term: true,
  lang: true,
  presentQuantity: true,
  promocode: true,
  promocodeId: true,
  createdAt: true,
  deliveryInfo: true,
  user: {
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      isVerified: true,
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
  orderStatusHistory: {
    select: {
      id: true,
      status: true,
      createdAt: true,
      updatedAt: true,
    },
  },
  orderItems: {
    select: {
      id: true,
      quantity: true,
      productId: true,

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

export const instaOrderSelect: Prisma.InstagramOrderSelect = {
  id: true,
  checkId: true,
  status: true,
  totalSum: true,
  itemPrice: true,
  comment: true,

  customerAddress: true,
  customerPhone: true,
  customerInitials: true,
  customerNickname: true,

  attachmentUrl: true,
  trackingNumber: true,

  paymentLink: true,

  createdAt: true,
  updatedAt: true,

  orderItems: {
    select: {
      id: true,
      quantity: true,
      productId: true,

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

export const changedInstaOrderStatusSelect: Prisma.InstagramOrderSelect = {
  id: true,
  checkId: true,
  status: true,
  totalSum: true,
  itemPrice: true,
  comment: true,
  customerAddress: true,
  customerPhone: true,
  customerInitials: true,
  customerNickname: true,
  attachmentUrl: true,
  trackingNumber: true,
  paymentLink: true,
  deliveryInfo: {
    select: {
      id: true,
      deliveryId: true,
      trackingNumber: true,
      deliveryStatus: true,
      deliveryCost: true,
      deliveryCreateTime: true,
      deliveryEstimateTime: true,
      deliveryPayedKeeping: true,
      deliveryStatusCode: true,
      isFreeDelivery: true,
      createdAt: true,
      updatedAt: true,
    },
  },
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
