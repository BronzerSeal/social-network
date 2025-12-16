"use server";

import { saltAndHashPassword } from "@/utils/password";
import prisma from "@/utils/prisma";

export async function changeUserPassword(email: string) {
  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (!existingUser) {
      return { error: "the user is not found" };
    }

    // return user;
  } catch (error) {
    console.log(error);
    return { error: "Ошибка регистрации" };
  }
}
