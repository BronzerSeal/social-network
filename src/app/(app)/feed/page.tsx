"use client";
import { useSession } from "next-auth/react";
const FeedPage = () => {
  const { data: session, status } = useSession();
  return (
    <div className="grid grid-cols-[2fr_1fr]">
      <div>p1</div>
      <div>p1</div>
    </div>
  );
};

export default FeedPage;
