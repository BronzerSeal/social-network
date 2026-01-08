"use server";

import prisma from "@/utils/prisma";

export const activatePro = async (userId: string) => {
  try {
    const response = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        proStatus: true,
      },
    });
    return { code: 200, updatedUser: response };
  } catch (error) {
    console.error("Error activating PRO:", error);
    return { error: `Error activating PRO` };
  }
};
