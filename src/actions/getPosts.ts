"use server";
import prisma from "@/utils/prisma";

export async function getPosts() {
  try {
    const posts = await (prisma.post.findMany as any)({
      include: {
        images: true,
        user: true,
      },
    });

    return { success: true, posts };
  } catch (error) {
    console.error("Error getting posts:", error);
    return { error: "Error getting posts" };
  }
}
