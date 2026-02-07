import { getUsersByName } from "@/actions/getUsersByName";
import {
  InfinitySearchUserResponse,
  SearchCursor,
  searchUser,
} from "@/types/post";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useSearchPeople = (query: string) => {
  const {
    data: users,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<
    InfinitySearchUserResponse,
    Error,
    searchUser[],
    readonly unknown[],
    SearchCursor
  >({
    queryKey: ["search-page search-users", query],
    queryFn: ({ pageParam }) => getUsersByName(query, pageParam),
    enabled: query.trim().length >= 1,
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    select: (result) => result.pages.flatMap((page) => page.users),
  });

  return {
    users,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  };
};
