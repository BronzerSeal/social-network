"use client";
import { getInfinityPosts } from "@/actions/posts/getInfinityPosts";
import UserPostSkeleton from "@/components/skeletons/UserPostSkeleton";
import { Cursor, InfinityPostsResponse, PostWithUser } from "@/types/post";
import { Chip } from "@heroui/react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useCallback, useRef } from "react";

export const useFeedPagePosts = () => {
  const {
    data: posts,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<
    InfinityPostsResponse,
    Error,
    PostWithUser[],
    readonly unknown[],
    Cursor
  >({
    queryKey: ["posts", "feed-page"],
    queryFn: ({ pageParam }) =>
      getInfinityPosts({
        cursor: pageParam,
      }),
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    select: (result) => result.pages.flatMap((page) => page.posts),
  });

  const cursorRef = useIntersection(() => {
    fetchNextPage();
  });

  const cursor = (
    <div ref={cursorRef}>
      {isFetchingNextPage && <UserPostSkeleton />}
      {!hasNextPage && (
        <Chip className="text-2xl mt-2" color="danger" radius="sm">
          No posts yet
        </Chip>
      )}
    </div>
  );

  return { posts, isLoading, cursor };
};

export function useIntersection(onIntersect: () => void) {
  const unsubscribe = useRef(() => {});

  return useCallback((el: HTMLDivElement | null) => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((intersection) => {
        if (intersection.isIntersecting) {
          onIntersect();
        }
      });
    });

    if (el) {
      observer.observe(el);
      unsubscribe.current = () => observer.disconnect();
    } else {
      unsubscribe.current();
    }
  }, []);
}
