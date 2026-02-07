"use server";
import { InfinitySearchHashtagsResponse, SearchCursor } from "@/types/post";
import prisma from "@/utils/prisma";

export const getHashtagsByName = async (
  name: string,
  cursor?: SearchCursor,
): Promise<InfinitySearchHashtagsResponse> => {
  if (!name || name.trim().length < 1) {
    return {
      hashtags: [],
      nextCursor: null,
      success: false,
      error: "no name",
    };
  }
  const HASHTAGS_PER_TIME = 5;
  try {
    const hashtags = await (prisma.hashtag.findMany as any)({
      take: HASHTAGS_PER_TIME,
      skip: cursor ? 1 : 0,
      cursor: cursor ? { id: cursor } : undefined,
      where: {
        content: {
          contains: name,
          mode: "insensitive",
        },
      },
    });

    return {
      success: true,
      hashtags,
      nextCursor:
        hashtags.length === 3 ? hashtags[hashtags.length - 1].id : null,
    };
  } catch (error) {
    console.error("Error finding users:", error);
    return {
      hashtags: [],
      nextCursor: null,
      success: false,
      error: `${error}`,
    };
  }
};
