"use server";

import prisma from "@/utils/prisma";

export const createComment = async (
  postId: string,
  userId: string,
  text: string
) => {
  try {
    const response = await prisma.comment.create({
      data: {
        postId,
        userId,
        text,
      },
    });
    return { success: true, code: 200, comment: response };
  } catch (error) {
    console.error("Error creating comment:", error);
    return { error: "Error creating comment" };
  }
};
