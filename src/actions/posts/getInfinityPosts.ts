"use server";
import { Cursor, InfinityPostsResponse } from "@/types/post";
import prisma from "@/utils/prisma";

const PAGE_SIZE = 10;

export async function getInfinityPosts({
  cursor,
}: {
  cursor?: Cursor;
}): Promise<InfinityPostsResponse> {
  try {
    const posts = await (prisma.post.findMany as any)({
      take: PAGE_SIZE + 1,
      skip: cursor ? 1 : 0,
      cursor: cursor
        ? {
            createdAt_id: {
              createdAt: cursor.createdAt,
              id: cursor.id,
            },
          }
        : undefined,
      include: {
        images: true,
        user: true,
        likedBy: true,
        comments: {
          orderBy: { createdAt: "desc" },
          include: { user: true },
        },
      },
      orderBy: [{ createdAt: "desc" }, { id: "desc" }],
    });

    let nextCursor = null;

    if (posts.length > PAGE_SIZE) {
      const nextItem = posts.pop()!;
      nextCursor = {
        createdAt: nextItem.createdAt,
        id: nextItem.id,
      };
    }

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
