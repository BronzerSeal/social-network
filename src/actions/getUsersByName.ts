"use server";
import { InfinitySearchUserResponse, SearchCursor } from "@/types/post";
import prisma from "@/utils/prisma";

export const getUsersByName = async (
  username: string,
  cursor?: SearchCursor,
): Promise<InfinitySearchUserResponse> => {
  if (!username || username.trim().length < 1) {
    return {
      users: [],
      nextCursor: null,
      success: false,
      error: "no username",
    };
  }
  const USERS_PER_TIME = 3;
  try {
    const users = await (prisma.user.findMany as any)({
      take: USERS_PER_TIME,
      skip: cursor ? 1 : 0,
      cursor: cursor ? { id: cursor } : undefined,
      where: {
        name: {
          contains: username,
          mode: "insensitive",
        },
      },
      select: {
        id: true,
        name: true,
        image: true,
        dopInfo: true,
      },
    });

    return {
      success: true,
      users,
      nextCursor: users.length === 3 ? users[users.length - 1].id : null,
    };
  } catch (error) {
    console.error("Error finding users:", error);
    return { users: [], nextCursor: null, success: false, error: `${error}` };
  }
};
