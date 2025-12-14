"use server";

import { IFormData } from "@/types/form-data";
import { saltAndHashPassword } from "@/utils/password";
import prisma from "@/utils/prisma";

type RegisterResult =
  | {
      id: string;
      name: string | null;
      email: string | null;
      password: string;
      emailVerified: Date | null;
      image: string | null;
    }
  | { error: string };

export async function registerUser(
  formData: IFormData
): Promise<RegisterResult> {
  const { email, password, confirmPassword, name } = formData;

  if (password !== confirmPassword) {
    return { error: "Пароли не совпадают" };
  }

  if (password.length < 6) {
    return { error: "Пароль должен быть не менее 6 символов" };
  }

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return { error: "Пользователь с таким email уже существует" };
    }

    const pwHash = await saltAndHashPassword(password);
    const user = await prisma.user.create({
      data: {
        email: email,
        password: pwHash,
        name: name,
      },
    });

    return user;
  } catch (error) {
    console.log(error);
    return { error: "Ошибка регистрации" };
  }
}
