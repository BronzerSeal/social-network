"use client";

import { getInfinityPostsByHashtag } from "@/actions/posts/getInfinityPostsByHashtag";
import { getPostsWithHashtagCount } from "@/actions/posts/getPostsWithHashtagCount";
import UserPostSkeleton from "@/components/skeletons/UserPostSkeleton";
import UserPost from "@/components/ui/userPost";
import {
  Cursor,
  InfinityPostsResponse,
  PostWithUserHashtag,
} from "@/types/post";
import { addToast, Card, CardBody, Chip } from "@heroui/react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { ChevronLeft } from "lucide-react";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

const HashtagPage = () => {
  const { tag } = useParams();
  const [postsCount, setPostsCount] = useState(1);

  const {
    data: posts,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<
    InfinityPostsResponse,
    Error,
    PostWithUserHashtag[],
    readonly unknown[],
    Cursor
  >({
    queryKey: ["posts", "hashtag-posts"],
    queryFn: ({ pageParam }) =>
      getInfinityPostsByHashtag({
        hashtag: `#${tag}`,
        cursor: pageParam,
      }),
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    select: (result) => result.pages.flatMap((page) => page.posts),
  });

  async function loadPostsCount() {
    try {
      const response = await getPostsWithHashtagCount(`#${tag}`);
      if (response.success) {
        setPostsCount(response.count);
      }
    } catch (error) {
      addToast({
        title: "Something was wrong. Try again later",
        color: "danger",
      });
    }
  }
  useEffect(() => {
    loadPostsCount();
  }, [tag]);

  const cursorRef = useIntersection(() => {
    fetchNextPage();
  });
  if (isLoading) {
    return <UserPostSkeleton />;
  }
  return (
    <div className="py-2">
      <Card>
        <CardBody className=" flex flex-row items-center gap-2">
          <ChevronLeft
            className="cursor-pointer"
            onClick={() => history.back()}
          />
          <div className="">
            <h1 className="text-xl text-blue-500">#{tag}</h1>
            <p className="text-gray-600">{postsCount} posts</p>
          </div>
        </CardBody>
      </Card>

      {!!posts &&
        posts.map((post) => (
          <UserPost key={post.id} post={post} canDelete={false} />
        ))}
      <div ref={cursorRef}>
        {isFetchingNextPage && <UserPostSkeleton />}
        {!hasNextPage && (
          <Chip className="text-2xl mt-2" color="danger" radius="sm">
            No posts yet
          </Chip>
        )}
      </div>
    </div>
  );
};

export default HashtagPage;

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
