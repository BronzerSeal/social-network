import { createComment } from "@/actions/posts/comments/createComment";
import { PostWithUser } from "@/types/post";
import { queryClient } from "@/utils/query-client";
import { useMutation } from "@tanstack/react-query";
import { User } from "next-auth";

interface Props {
  postId: string;
  user: User;
  value: string;
}

export const useCreateComment = () => {
  return useMutation({
    mutationKey: ["comment createComment"],
    mutationFn: ({ postId, user, value }: Props) =>
      createComment(postId, user.id ?? "", value),

    onMutate: async ({ postId, user, value }) => {
      await queryClient.cancelQueries({
        queryKey: ["posts"],
      });

      const previousData = queryClient.getQueryData(["posts", "feed-page"]);

      queryClient.setQueryData(["posts", "feed-page"], (old: any) => {
        if (!old) return old;

        return {
          ...old,
          pages: old.pages.map((page: any) => ({
            ...page,
            posts: page.posts.map((post: PostWithUser) =>
              post.id === postId
                ? {
                    ...post,
                    comments: [
                      {
                        id: "temp-id",
                        postId: postId,
                        text: value,
                        userId: user.id,
                        user: user,
                        createdAt: new Date(),
                        updatedAt: new Date(),
                      },
                      ...post.comments,
                    ],
                  }
                : post,
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

    onSettled: () =>
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      }),
  });
};
