"use server";

import { IFormData } from "@/types/form-data";
import { saltAndHashPassword } from "@/utils/auth/password";
import prisma from "@/utils/prisma";

type RegisterResult =
  | {
      id: string;
      name: string | null;
      email: string | null;
      password: string | null;
      emailVerified: Date | null;
      image: string | null;
      provider: "credentials" | "google";
    }
  | { error: string };

export async function registerUser(
  formData: IFormData
): Promise<RegisterResult> {
  const { email, password, confirmPassword, name } = formData;

  if (password !== confirmPassword) {
    return { error: "The passwords don't match" };
  }

  if (password.length < 6) {
    return { error: "The password must be at least 6 characters long." };
  }

  try {
    const existingUser = await (prisma.user.findUnique as any)({
      where: { email },
    });

    if (existingUser) {
      return { error: "A user with this email already exists." };
    }

    const pwHash = await saltAndHashPassword(password);
    const user = await prisma.user.create({
      data: {
        email: email,
        password: pwHash,
        name: name,
        provider: "credentials",
      },
    });

    return user;
  } catch (error) {
    console.log(error);
    return { error: "Registration error" };
  }
}
