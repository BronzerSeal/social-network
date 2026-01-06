"use server";
import prisma from "@/utils/prisma";

export async function getUserPostsById(userId: string) {
  try {
    const user = await (prisma.user.findUnique as any)({
      where: { id: userId },
      include: {
        posts: {
          include: {
            images: true,
            user: true,
            likedBy: true,
            comments: {
              orderBy: { createdAt: "desc" },
              include: { user: true },
            },
          },
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    if (!user) {
      return { success: false, posts: [] };
    }

    return { success: true, posts: user.posts };
  } catch (error) {
    console.error("Error getting posts:", error);
    return { success: false, error: "Error getting posts" };
  }
}
