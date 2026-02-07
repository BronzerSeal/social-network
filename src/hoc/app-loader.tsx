"use client";

import { useSession } from "next-auth/react";

interface IProps {
  children: React.ReactNode;
}

const AppLoader = ({ children }: IProps) => {
  const { data: session } = useSession();

  return <>{children}</>;
};

export default AppLoader;
