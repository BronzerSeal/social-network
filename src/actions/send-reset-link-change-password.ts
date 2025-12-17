"use server";
import crypto from "crypto";
import prisma from "@/utils/prisma";
import { Resend } from "resend";
import EmailForm from "@/forms/emailForm";
import { jsx } from "react/jsx-runtime";

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function sendResetLink(email: string) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return;

  if (user.provider !== "credentials") {
    return {
      success: false,
      error:
        "You created an account using Google, so you won't be able to use this page.",
      code: 400,
    };
  }

  const token = crypto.randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + 1000 * 60 * 60); // 1 час

  await prisma.resetToken.create({
    data: {
      userId: user.id,
      token,
      expiresAt,
    },
  });

  const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/accounts/password/reset/new?token=${token}`;

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Reset your password",
    react: jsx(EmailForm, { resetUrl }),
  });
}
