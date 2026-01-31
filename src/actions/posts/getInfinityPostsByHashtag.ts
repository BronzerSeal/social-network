"use server";

import { PostWithUserHashtag } from "@/types/post";
import prisma from "@/utils/prisma";

const PAGE_SIZE = 10;

export type InfinityPostsResponse = {
  posts: PostWithUserHashtag[];
  nextCursor: { createdAt: Date; id: string } | null;
};

export async function getInfinityPostsByHashtag({
  hashtag,
  cursor,
}: {
  hashtag: string;
  cursor?: { createdAt: Date; id: string } | null;
}): Promise<InfinityPostsResponse> {
  try {
    const posts = await (prisma.post.findMany as any)({
      take: PAGE_SIZE + 1,
      orderBy: [{ createdAt: "desc" }, { id: "desc" }],
      where: {
        hashtags: {
          some: {
            content: hashtag,
          },
        },
      },
      cursor: cursor
        ? {
            createdAt_id: {
              createdAt: cursor.createdAt,
              id: cursor.id,
            },
          }
        : undefined,
      skip: cursor ? 1 : 0,
      include: {
        user: true,
        images: true,
        hashtags: true,
        likedBy: true,
        comments: {
          orderBy: { createdAt: "desc" },
          include: { user: true },
        },
      },
    });

    let nextCursor = null;

    if (posts.length > PAGE_SIZE) {
      const nextItem = posts.pop()!;
      nextCursor = {
        createdAt: nextItem.createdAt,
        id: nextItem.id,
      };
    }

    return {
      posts,
      nextCursor,
    };
  } catch (error) {
    console.log(error);
    return { posts: [], nextCursor: null };
  }
}
