"use client";

import { Button } from "@heroui/react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const NotFoundPage = () => {
  const searchParams = useSearchParams();
  const message = searchParams.get("message");
  return (
    <div className="flex flex-col items-center justify-center ">
      <div className="text-8xl font-bold text-gray-300">401</div>

      <h1 className="text-3xl font-bold tracking-tight">{message}</h1>

      <div className="pt-6">
        <Button as={Link} color="primary" variant="shadow" href="/">
          Return to home
        </Button>
      </div>
    </div>
  );
};

export default NotFoundPage;
