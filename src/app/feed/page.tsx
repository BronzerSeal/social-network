"use client";
import { useSession } from "next-auth/react";
const FeedPage = () => {
  const { data: session, status } = useSession();
  return <div>FeedPage</div>;
};

export default FeedPage;
