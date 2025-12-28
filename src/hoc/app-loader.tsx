"use client";

import { loadPosts } from "@/store/posts.store.";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

interface IProps {
  children: React.ReactNode;
}

const AppLoader = ({ children }: IProps) => {
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user) {
      loadPosts();
    }
  }, [session, loadPosts]);

  return <>{children}</>;
};

export default AppLoader;
