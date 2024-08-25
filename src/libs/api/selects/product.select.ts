import { Prisma } from "@prisma/client";

export const productSelect: Prisma.ProductSelect = {
  id: true,
  productName: true,
  description: true,
  price: true,
  isStock: true,
  locale: true,
  images: {
    select: {
      url: true,
    },
  },
  properties: {
    select: {
      id: true,
      label: true,
      image: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  },
};
