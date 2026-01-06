"use client";

import { Skeleton } from "@heroui/react";

const UserPostSkeleton = () => {
  return (
    <div className="mt-2">
      <div className="border border-gray-200 rounded-xl shadow-lg overflow-hidden animate-pulse bg-gray-100">
        {/* Header */}
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-2">
            <Skeleton className="w-10 h-10 rounded-full" /> {/* Аватар */}
            <Skeleton className="w-32 h-4 rounded-md" /> {/* Имя */}
          </div>
          <Skeleton className="w-6 h-6 rounded" /> {/* Кнопка X */}
        </div>

        {/* Body */}
        <div className="p-4 flex flex-col gap-2">
          <Skeleton className="w-full h-64 rounded-md" />{" "}
          {/* Основное изображение */}
          <div className="flex gap-2 overflow-x-auto">
            <Skeleton className="w-24 h-24 rounded-md shrink-0" />
            <Skeleton className="w-24 h-24 rounded-md shrink-0" />
            <Skeleton className="w-24 h-24 rounded-md shrink-0" />
          </div>
          <Skeleton className="w-full h-4 rounded-md mt-2" />{" "}
          {/* Текст поста */}
          <Skeleton className="w-3/4 h-4 rounded-md" />
        </div>

        {/* Footer */}
        <div className="flex gap-4 p-4 text-gray-600">
          <Skeleton className="w-12 h-4 rounded-md" /> {/* Heart */}
          <Skeleton className="w-12 h-4 rounded-md" /> {/* Comments */}
          <Skeleton className="w-12 h-4 rounded-md" /> {/* Share */}
        </div>
      </div>
    </div>
  );
};

export default UserPostSkeleton;
