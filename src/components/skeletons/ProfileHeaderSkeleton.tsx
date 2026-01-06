"use client";

import { Skeleton } from "@heroui/react";

const ProfileHeaderSkeleton = () => {
  return (
    <div className="w-full h-80 flex items-end rounded-2xl border border-gray-200 shadow-xl overflow-hidden bg-gray-100 animate-pulse">
      <div className="bg-white/90 backdrop-blur-sm w-full py-3 px-6 flex justify-between items-center rounded-t-2xl shadow-[0_-10px_30px_rgba(0,0,0,0.15)]">
        <div className="flex">
          <div className="relative w-32 h-32 -mt-16 z-10">
            <Skeleton className="w-32 h-32 rounded-full shadow-2xl" />
          </div>

          <div className="flex flex-col justify-center text-left ml-4 space-y-2">
            <Skeleton className="w-48 h-6 rounded-md" />
            <Skeleton className="w-64 h-4 rounded-md" />
          </div>
        </div>

        <div>
          <Skeleton className="w-12 h-12 rounded-lg" />
        </div>
      </div>
    </div>
  );
};

export default ProfileHeaderSkeleton;
