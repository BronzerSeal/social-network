"use client";

import { createComment } from "@/actions/posts/comments/createComment";
import { loadPostById, loadPosts } from "@/store/posts.store.";
import { CommentProps } from "@/types/post";
import { addToast, Avatar, Button, Input } from "@heroui/react";
import { Send } from "lucide-react";
import { useSession } from "next-auth/react";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";

interface Props {
  postId: string;
  setComments: Dispatch<SetStateAction<CommentProps[]>>;
}

const NewCommentForm = ({ postId, setComments }: Props) => {
  const { data: session } = useSession();
  const [value, setValue] = useState("");

  const handleCreateComment = async () => {
    if (!session?.user.id)
      return addToast({
        title: "Log in to write comments",
        color: "danger",
      });
    if (!value)
      return addToast({
        title: "write something to post comment",
        color: "danger",
      });
    const result = await createComment(postId, session?.user.id, value);

    if (!result?.comment) {
      addToast({
        title: "Failed to add comment",
        color: "danger",
      });
      return;
    }
    console.log("RESULT: ", result);
    setComments((prev) => [
      { ...result.comment, user: session.user as any },
      ...prev,
    ]);
    addToast({
      title: "successful addition of a comment",
      color: "success",
    });
    setValue("");
    loadPostById(postId);
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
