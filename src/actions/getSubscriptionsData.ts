"use server";
import prisma from "@/utils/prisma";

export async function getSubscriptionsData(userId: string) {
  const user = await (prisma.user.findUnique as any)({
    where: { id: userId },
    select: { subscriptions: true },
  });

  if (!user || !user.subscriptions || user.subscriptions.length === 0)
    return [];

  // Получаем только id, name и image этих пользователей
  const subsData = await (prisma.user.findMany as any)({
    where: { id: { in: user.subscriptions } },
    select: { id: true, name: true, image: true },
  });

  return subsData;
}
