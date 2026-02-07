import { getHashtagsByName } from "@/actions/getHashtagsByName";
import {
  Hashtag,
  InfinitySearchHashtagsResponse,
  SearchCursor,
} from "@/types/post";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useSearcHashtags = (query: string) => {
  const {
    data: hashtags,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<
    InfinitySearchHashtagsResponse,
    Error,
    Hashtag[],
    readonly unknown[],
    SearchCursor
  >({
    queryKey: ["search-page search-hahtags", query],
    queryFn: ({ pageParam }) => getHashtagsByName(query, pageParam),
    enabled: query.trim().length >= 1,
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    select: (result) => result.pages.flatMap((page) => page.hashtags),
  });

  return {
    hashtags,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  };
};
