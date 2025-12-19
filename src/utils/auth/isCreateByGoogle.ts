"use server";

import prisma from "@/utils/prisma";

export async function isCreateByGoogle(email: string) {
  const user = await prisma.user.findUnique({
    where: { email },
    select: { provider: true },
  });

  if (user?.provider === "google") {
    return true;
  }

  return false;
}
