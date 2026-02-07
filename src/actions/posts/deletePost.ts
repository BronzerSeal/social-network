"use server";
import { Post } from "@/types/post";
import prisma from "@/utils/prisma";
import { del } from "@vercel/blob";

export const deletePost = async (postId: string) => {
  try {
    const post: Post = await (prisma.post.findUnique as any)({
      where: {
        id: postId,
      },
      include: {
        images: {
          select: {
            file_data: true,
          },
        },
      },
    });
    if (!post) {
      return { error: "Post not found" };
    }

    if (post?.images.length) {
      await Promise.all(post.images.map((img) => del(img.file_data)));
    }

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
