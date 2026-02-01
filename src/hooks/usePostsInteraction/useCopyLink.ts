import { increaseSentTimes } from "@/actions/posts/sentTimes/increaseSentTimes";
import { queryClient } from "@/utils/query-client";
import { useMutation } from "@tanstack/react-query";

const useCopyLink = () => {
  return useMutation({
    mutationKey: ["copyLink"],
    mutationFn: (postId: string) => increaseSentTimes(postId),
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["posts"] }),
  });
};

export default useCopyLink;
