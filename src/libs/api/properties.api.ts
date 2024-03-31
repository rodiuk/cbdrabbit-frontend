"use server";

import {
  IPropertyCreate,
  IPropertyUpdate,
} from "@/interfaces/property.interface";
import prisma from "@/libs/client/prisma.client";

export const getAllProperties = async () => {
  try {
    const properties = await prisma.property.findMany();

    return properties;
  } catch (error) {
    throw error;
  }
};

export const getPropertyById = async (id: string) => {
  try {
    const property = await prisma.property.findUnique({
      where: {
        id,
      },
    });

    return property;
  } catch (error) {
    throw error;
  }
};

export const createProperty = async (propertyData: IPropertyCreate) => {
  try {
    const property = await prisma.property.create({
      data: {
        label: propertyData.label,
        image: {
          create: {
            url: propertyData.imgUrl,
          },
        },
      },
    });

    return property;
  } catch (error) {
    throw error;
  }
};

export const updateProperty = async (
  id: string,
  propertyData: IPropertyUpdate
) => {
  try {
    const property = await prisma.property.update({
      where: {
        id,
      },
      data: {
        label: propertyData.label,
        ...(propertyData?.imgUrl && {
          image: {
            update: {
              url: propertyData.imgUrl,
            },
          },
        }),
      },
    });

    return property;
  } catch (error) {
    throw error;
  }
};
