"use client";

import { signIn } from "next-auth/react";

export async function signInWithCredentials(email: string, password: string) {
  try {
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    return result;
  } catch (error) {
    console.error("Ошибка авторизации:", error);
    return { error: error };
  }
}
