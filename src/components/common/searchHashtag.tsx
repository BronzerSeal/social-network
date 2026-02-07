"use client";
import { Hashtag } from "@/types/post";
import { Avatar } from "@heroui/react";
import { useRouter } from "next/navigation";

const SearchHashtag = ({ hashtag }: { hashtag: Hashtag }) => {
  const router = useRouter();

  return (
    <div
      className="flex gap-2 cursor-pointer items-center"
      onClick={() => router.push(`hashtag/${hashtag.content.slice(1)}`)}
    >
      <Avatar name="#" className="text-xl" />
      <h1 className="text-xl">{hashtag.content.slice(1)}</h1>
    </div>
  );
};

export default SearchHashtag;
