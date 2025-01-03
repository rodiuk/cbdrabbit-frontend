"use server";

import { IProductCreate, IProductRes } from "@/interfaces/product.interface";
import prisma from "@/libs/client/prisma.client";
import { productSelect } from "./selects/product.select";

export const getAllProducts = async (lang: string) => {
  try {
    const product = await prisma.product.findMany({
      where: {
        locale: lang,
      },
      select: productSelect,
    });

    return product;
  } catch (error) {
    throw error;
  }
};

export const getProductById = async (id: string, lang: string) => {
  try {
    const product = await prisma.product.findUnique({
      where: {
        id,
        locale: lang,
      },
      select: productSelect,
    });

    return product;
  } catch (error) {
    throw error;
  }
};

export const getProductsByIds = async (
  ids: string[]
): Promise<IProductRes[]> => {
  try {
    const products = await prisma.product.findMany({
      where: {
        id: {
          in: ids,
        },
      },
      select: productSelect,
    });

    return products;
  } catch (error) {
    throw error;
  }
};

export const createProduct = async (productData: IProductCreate) => {
  try {
    const product = await prisma.$transaction(async prisma => {
      const product = await prisma.product.create({
        data: {
          productName: productData.productName,
          description: productData.description,
          price: productData.price,
          locale: productData.locale,
          images: {
            createMany: {
              data: productData?.images.map(imageUrl => ({
                url: imageUrl,
              })),
            },
          },
        },
      });

      const updatedProduct = await prisma.product.update({
        where: {
          id: product.id,
        },
        data: {
          properties: {
            connect: productData?.propertiesIds.map(propertyId => ({
              id: propertyId,
            })),
          },
        },
      });

      return updatedProduct;
    });

    return product;
  } catch (error) {
    throw error;
  }
};
