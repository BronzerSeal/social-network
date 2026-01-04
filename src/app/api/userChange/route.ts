"use server";
import prisma from "@/utils/prisma";
import { put } from "@vercel/blob";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const variant = formData.get("variant") as string;
    const userId = formData.get("userId") as string;

    if (!variant || !userId) {
      return NextResponse.json(
        { message: "No data provided" },
        { status: 400 }
      );
    }

    if (variant === "avatar") {
      const userAvatar = formData.get("userAvatar") as File;

      if (!userAvatar) {
        return NextResponse.json(
          { message: "No avatar provided" },
          { status: 400 }
        );
      }

      // Загружаем файл в Vercel Blob
      const fileName = `${Date.now()}-${userAvatar.name}`;

      const blob = await put(fileName, userAvatar, {
        access: "public",
        addRandomSuffix: true,
      });

      // Загружаем файлы в prisma
      const updatedUser = await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          image: blob.url,
        },
      });

      return NextResponse.json({ updatedUser: updatedUser, file: blob });
    }
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
