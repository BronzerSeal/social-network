"use client";

import { useCreateComment } from "@/hooks/usePostsInteraction/comments/useCreateComment";
import { addToast, Avatar, Button, Input } from "@heroui/react";
import { Send } from "lucide-react";
import { useSession } from "next-auth/react";
import { ChangeEvent, useState } from "react";

interface Props {
  postId: string;
}

const NewCommentForm = ({ postId }: Props) => {
  const { data: session } = useSession();
  const [value, setValue] = useState("");
  const createCommentMutation = useCreateComment();

  const handleCreateComment = async () => {
    if (!session?.user.id) {
      return addToast({
        title: "Log in to write comments",
        color: "danger",
      });
    }
    if (!value) {
      return addToast({
        title: "write something to post comment",
        color: "danger",
      });
    }

    createCommentMutation.mutate({
      postId,
      user: session?.user,
      value,
    });

    if (createCommentMutation.error) {
      addToast({
        title: "Failed to add comment",
        color: "danger",
      });
      return;
    } else {
      addToast({
        title: "successful addition of a comment",
        color: "success",
      });
    }

    setValue("");
  };

  return (
    <div className="flex gap-2 justify-center items-center">
      <Avatar
        src={session?.user.image || undefined}
        name={session?.user.name || session?.user.email || undefined}
        size="sm"
        className="shrink-0"
      />
      <Input
        placeholder="write comment"
        value={value}
        onInput={(e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
      />

      <Button
        isDisabled={!value}
        onPress={handleCreateComment}
        color="primary"
        data-testid="commentSubmit"
      >
        <Send />
      </Button>
    </div>
  );
};

export default NewCommentForm;
