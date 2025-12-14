"use client";
import { useSession } from "next-auth/react";
const FeedPage = () => {
  const { data: session, status } = useSession();
  console.log("Session: ", session);
  console.log("Satus: ", status);
  return <div>FeedPage</div>;
};

export default FeedPage;
