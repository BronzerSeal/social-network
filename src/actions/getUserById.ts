"use server";

import prisma from "@/utils/prisma";

const getUserById = async (userId: string) => {
  try {
    const response = await (prisma.user.findUnique as any)({
      where: {
        id: userId,
      },
    });
    return response;
  } catch (error) {
    console.error("Error finding user:", error);
    return { error: `Error finding user` };
  }
};

export default getUserById;
