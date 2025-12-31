"use server";

import { signIn } from "@/auth/auth";

export async function sendResetLink(email: string) {
  await signIn("resend", {
    email,
    callbackUrl: "/accounts/password/reset/new", // куда придёт после magic link
  });
}
