"use server";
import prisma from "@/utils/prisma";
import { saltAndHashPassword } from "@/utils/auth/password";

export async function updatePassword({
  token,
  password,
}: {
  token: string;
  password: string;
}) {
  const resetToken = await (prisma.resetToken.findUnique as any)({
    where: { token },
    include: { user: true },
  });

  if (!resetToken || resetToken.expiresAt < new Date()) {
    return { ok: false, error: "Invalid or expired token" };
  }

  const hash = await saltAndHashPassword(password);

  await prisma.user.update({
    where: {
      id: resetToken.userId,
    },
    data: {
      password: hash,
    },
  });

  await prisma.resetToken.delete({ where: { token } });
  return { ok: true };
}
