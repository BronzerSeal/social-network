"use server";
import prisma from "@/utils/prisma";

export const deletePost = async (postId: string) => {
  try {
    const response = await prisma.post.delete({
      where: {
        id: postId,
      },
    });

    return response;
  } catch (error) {
    console.error("Error deleting post:", error);
    return { error: "Error deleting post" };
  }
};
