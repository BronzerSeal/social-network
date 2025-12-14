"use client";

import { pageUrls } from "@/configs/pageUrls.config";
import { Button } from "@heroui/react";
import Link from "next/link";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center ">
      <div className="text-8xl font-bold text-gray-300">404</div>

      <h1 className="text-3xl font-bold tracking-tight">Page not found</h1>

      <div className="pt-6">
        <Button
          as={Link}
          color="primary"
          variant="shadow"
          href={pageUrls.feedPage}
        >
          Return to home
        </Button>
      </div>
    </div>
  );
};

export default NotFoundPage;
