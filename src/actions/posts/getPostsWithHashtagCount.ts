"use server";

import prisma from "@/utils/prisma";

export async function getPostsWithHashtagCount(hashtag: string) {
  try {
    const response = await (prisma.post.count as any)({
      where: {
        hashtags: {
          some: {
            content: hashtag,
          },
        },
      },
    });
    console.log("resp", response);
    return {
      success: true,
      count: response,
    };
  } catch (error) {
    console.error("Error getting posts:", error);
    return { success: false, error: "Error getting posts" };
  }
}
