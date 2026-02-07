"use client";
import { searchUser } from "@/types/post";
import { Avatar } from "@heroui/react";
import { useRouter } from "next/navigation";
import SubscribeBtn from "./subscribeBtn";
import { useSession } from "next-auth/react";

const SearchUser = ({ user }: { user: searchUser }) => {
  const router = useRouter();
  const { data: session } = useSession();
  const subscribed = session?.user.subscriptions.some(
    (sub) => sub === user?.id,
  );
  return (
    <div
      className="flex justify-between cursor-pointer"
      onClick={() => router.push(`user/${user.id}`)}
    >
      <div className="flex">
        <Avatar size="lg" src={user.image ?? ""} name={user.name} />
        <div className="ml-2">
          <h1 className="text-[15px] font-bold ">{user.name}</h1>
          <h2 className="text-gray-500 text-[14px]">{user.dopInfo}</h2>
        </div>
      </div>
      <SubscribeBtn isSubscribed={subscribed} pageUserId={user.id} />
    </div>
  );
};

export default SearchUser;
