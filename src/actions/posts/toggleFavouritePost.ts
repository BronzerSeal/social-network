"use server";

import prisma from "@/utils/prisma";

const toggleFavouritePost = async (
  postId: string,
  liked: boolean,
  userId: string
) => {
  if (!userId) return;

  if (liked) {
    await prisma.userLikedPost.create({
      data: {
        userId,
        postId,
      },
    });
  } else {
    await prisma.userLikedPost.delete({
      where: {
        userId_postId: {
          userId,
          postId,
        },
      },
    });
  }
};

export default toggleFavouritePost;
