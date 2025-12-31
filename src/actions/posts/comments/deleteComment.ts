"use server";

import prisma from "@/utils/prisma";

export const deleteComment = async (commentId: string) => {
  try {
    const result = await prisma.comment.delete({
      where: {
        id: commentId,
      },
    });
    return { success: true, code: 200, comment: result };
  } catch (error) {
    console.error("Error deleting comment:", error);
    return { error: "Error deleting comment", code: 500 };
  }
};
