import toggleFavouritePost from "@/actions/posts/toggleFavouritePost";
import { PostWithUser } from "@/types/post";
import { queryClient } from "@/utils/query-client";
import { useMutation } from "@tanstack/react-query";

type LikeVars = {
  postId: string;
  userId: string;
  newHeart: boolean;
};

export const usePostLike = () => {
  return useMutation({
    mutationKey: ["like post"],
    mutationFn: ({ postId, userId, newHeart }: LikeVars) =>
      toggleFavouritePost(postId, newHeart, userId),

    onMutate: async ({ postId, userId, newHeart }) => {
      await queryClient.cancelQueries({
        queryKey: ["posts"],
      });

      const previousData = queryClient.getQueryData<any>(["posts"]);

      queryClient.setQueryData(["posts", "feed-page"], (old: any) => {
        if (!old) return old;

        return {
          ...old,
          pages: old.pages.map((page: any) => ({
            ...page,
            posts: page.posts.map((p: PostWithUser) =>
              p.id === postId
                ? {
                    ...p,
                    likedBy: newHeart
                      ? [...p.likedBy, { userId: userId }]
                      : p.likedBy.filter((l: any) => l.userId !== userId),
                  }
                : p,
            ),
          })),
        };
      });

      return { previousData };
    },

    onError: (_, __, context) => {
      if (context) {
        queryClient.setQueryData(["posts", "feed-page"], context.previousData);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
};
