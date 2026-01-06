"use server";

import prisma from "@/utils/prisma";

export const getPostById = async (postId: string) => {
  try {
    const post = await (prisma.post.findUnique as any)({
      where: { id: postId },
      include: {
        images: true,
        user: true,
        likedBy: true,
        comments: {
          orderBy: { createdAt: "desc" },
          include: { user: true },
        },
      },
    });

    return { success: true, post };
  } catch (error) {
    console.error(error);
    return { success: false, error: "failed to load post" };
  }
};
