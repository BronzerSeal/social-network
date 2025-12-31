"use server";
import prisma from "@/utils/prisma";

export async function getPosts() {
  try {
    const posts = await (prisma.post.findMany as any)({
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
    });

    return { success: true, posts };
  } catch (error) {
    console.error("Error getting posts:", error);
    return { error: "Error getting posts" };
  }
}
