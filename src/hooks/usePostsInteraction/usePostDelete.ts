import { deletePost } from "@/actions/posts/deletePost";
import { PostWithUser } from "@/types/post";
import { queryClient } from "@/utils/query-client";
import { useMutation } from "@tanstack/react-query";

export const useDeletePost = () => {
  return useMutation({
    mutationKey: ["delete post"],
    mutationFn: (postId: string) => deletePost(postId),

    onMutate: async (postId: string) => {
      await queryClient.cancelQueries({
        queryKey: ["posts"],
      });

      const previousData = queryClient.getQueryData<any>(["posts"]);

      queryClient.setQueryData(["posts"], (old: any) => {
        if (!old) return old;

        return {
          ...old,
          pages: old.pages.map((page: any) => ({
            ...page,
            posts: page.posts.filter(
              (post: PostWithUser) => post.id !== postId,
            ),
          })),
        };
      });

      return { previousData };
    },

    onError: (_, __, context) => {
      if (context) {
        queryClient.setQueryData(["posts"], context.previousData);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
};
