"use server";

import prisma from "@/utils/prisma";

const subscribe = async (userId: string, subscriptionUserId: string) => {
  try {
    const user = await (prisma.user.findUnique as any)({
      where: { id: userId },
      select: { subscriptions: true },
    });
    if (!user) return { error: "User not found" };

    let updatedSubscriptions: string[];

    if (user.subscriptions.includes(subscriptionUserId)) {
      updatedSubscriptions = user.subscriptions.filter(
        (id: string) => id !== subscriptionUserId
      );
    } else {
      updatedSubscriptions = [...user.subscriptions, subscriptionUserId];
    }

    const response = await prisma.user.update({
      where: { id: userId },
      data: { subscriptions: { set: updatedSubscriptions } },
    });

    return { code: 200, updatedUser: response };
  } catch (error) {
    console.error("Error subscribe user:", error);
    return {
      error: `Error subscribe user: ${error instanceof Error ? error.message : error}`,
    };
  }
};

export default subscribe;
