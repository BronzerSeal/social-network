"use client";

import { signOut } from "next-auth/react";

export async function signOutFunc() {
  try {
    const result = await signOut({ redirect: false });

    return result;
  } catch (error) {
    console.error("Ошибка авторизации:", error);
    throw error;
  }
}
