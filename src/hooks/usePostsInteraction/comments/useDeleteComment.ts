import { deleteComment } from "@/actions/posts/comments/deleteComment";
import { PostWithUser } from "@/types/post";
import { queryClient } from "@/utils/query-client";
import { useMutation } from "@tanstack/react-query";

interface Props {
  postId: string;
  commentId: string;
}

export const useDeleteComment = () => {
  return useMutation({
    mutationKey: ["comment deleteComment"],
    mutationFn: ({ commentId }: Props) => deleteComment(commentId),

    onMutate: async ({ postId, commentId }) => {
      await queryClient.cancelQueries({
        queryKey: ["posts"],
      });

      const previousData = queryClient.getQueryData(["posts", "feed-page"]);

      queryClient.setQueryData(["posts", "feed-page"], (old: any) => {
        if (!old) return old;
        console.log(old);
        return {
          ...old,
          pages: old.pages.map((page: any) => ({
            ...page,
            posts: page.posts.map((post: PostWithUser) =>
              post.id === postId
                ? {
                    ...post,
                    comments: post.comments.filter((c) => c.id !== commentId),
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
