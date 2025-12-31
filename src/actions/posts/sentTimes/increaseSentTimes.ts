"use server";

import prisma from "@/utils/prisma";

export const increaseSentTimes = async (postId: string) => {
  try {
    await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        sentTimes: { increment: 1 },
      },
    });

    return { code: 200, success: true };
  } catch (error) {
    console.error("Error increasing sentTimes count:", error);
    return { error: "Error increasing sentTimes count" };
  }
};
