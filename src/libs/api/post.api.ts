"use server";

import prisma from "@/libs/client/prisma.client";
import { IPostCreate } from "@/interfaces/post.interface";

export const getAllPosts = async () => {
  try {
    const posts = await prisma.post.findMany();

    return posts;
  } catch (error) {
    throw error;
  }
};

export const getPostById = async (postId: string) => {
  try {
    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    return post;
  } catch (error) {
    throw error;
  }
};

export const createPost = async (postData: IPostCreate) => {
  try {
    const post = await prisma.post.create({
      data: postData,
    });

    return post;
  } catch (error) {
    throw error;
  }
};

export const DeletePost = async (postId: string) => {
  try {
    const post = await prisma.post.delete({
      where: {
        id: postId,
      },
    });

    return post;
  } catch (error) {
    throw error;
  }
};
