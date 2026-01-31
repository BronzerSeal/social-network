import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";
import prisma from "@/utils/prisma";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const post_text = formData.get("text") as string;
    const userId = formData.get("userId") as string;
    const files = formData.getAll("files") as File[];
    const hashtags = formData.getAll("hashtags") as string[];

    if (!post_text) {
      return NextResponse.json(
        { message: "No text provided" },
        { status: 400 },
      );
    }

    const createdPost = await prisma.post.create({
      data: {
        text: post_text,
        userId,
        hashtags: {
          connectOrCreate: hashtags.map((tag) => ({
            where: { content: tag },
            create: { content: tag },
          })),
        },
      },
      include: {
        hashtags: true,
      },
    });

    // Загружаем файлы в Vercel Blob
    const createdFiles = await Promise.all(
      files.map(async (file) => {
        const fileName = `${Date.now()}-${file.name}`;

        const blob = await put(fileName, file, {
          access: "public",
          addRandomSuffix: true,
        });

        // Загружаем файлы в prisma
        return prisma.postImage.create({
          data: {
            post_id: createdPost.id,
            file_name: fileName,
            file_data: blob.url,
          },
        });
      }),
    );

    return NextResponse.json({ post: createdPost, files: createdFiles });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
