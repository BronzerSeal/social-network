"use server";
import { Cursor, InfinityPostsResponse, PostWithUser } from "@/types/post";
import prisma from "@/utils/prisma";

interface Response {
  id: string;
  userId: string;
  postId: string;
  createdAt: Date;
  post: PostWithUser;
}

const PAGE_SIZE = 10;

export async function getInfinityUserLikedPosts({
  cursor,
  userId,
}: {
  cursor?: Cursor;
  userId: string;
}): Promise<InfinityPostsResponse> {
  try {
    const liked: Response[] = await (prisma.userLikedPost.findMany as any)({
      take: PAGE_SIZE + 1,
      skip: cursor ? 1 : 0,
      where: {
        userId,
      },
      cursor: cursor
        ? {
            createdAt_id: {
              createdAt: cursor.createdAt,
              id: cursor.id,
            },
          }
        : undefined,
      include: {
        post: {
          include: {
            images: true,
            user: true,
            likedBy: true,
            comments: {
              orderBy: { createdAt: "desc" },
              include: {
                user: true,
              },
            },
          },
        },
      },
      orderBy: [{ createdAt: "desc" }, { id: "desc" }],
    });

    let nextCursor = null;

    if (liked.length > PAGE_SIZE) {
      const nextItem = liked.pop()!;
      nextCursor = {
        createdAt: nextItem.createdAt,
        id: nextItem.id,
      };
    }
    const posts = liked.map((item: any) => item.post);
    return { success: true, posts, nextCursor };
  } catch (error) {
    console.error("Error getting posts:", error);
    return {
      error: "Error getting posts",
      posts: [],
      nextCursor: null,
      success: false,
    };
  }
}
