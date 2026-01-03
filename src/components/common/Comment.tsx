"use client";

import { deleteComment } from "@/actions/posts/comments/deleteComment";
import { CommentProps } from "@/types/post";
import { formatTime } from "@/utils/formatTime";
import { addToast, Avatar } from "@heroui/react";
import { X } from "lucide-react";
import { useSession } from "next-auth/react";
import { Dispatch, SetStateAction, useState } from "react";

interface Props {
  comment: CommentProps;
  comments: CommentProps[];
  setComments: Dispatch<SetStateAction<CommentProps[]>>;
}

const Comment = ({ comment, setComments, comments }: Props) => {
  const { data: session } = useSession();
  const [expanded, setExpanded] = useState(false);

  const MAX_LENGTH = 150;

  const isLong = comment.text.length > MAX_LENGTH;

  const displayedText = expanded
    ? comment.text
    : comment.text.slice(0, MAX_LENGTH);

  const handleDeleteComment = async () => {
    const result = await deleteComment(comment.id);

    if (!result?.comment) {
      return addToast({
        title: result.error,
        color: "danger",
      });
    }

    const filteredComments = comments.filter(
      (com) => com.id !== result.comment.id
    );
    setComments(filteredComments);
    addToast({
      title: "comment successful deleted",
      color: "success",
    });
  };

  return (
    <div className="grid grid-cols-[1fr_8fr] gap-1">
      <Avatar
        size="sm"
        src={comment.user?.image || undefined}
        name={comment.user?.name || undefined}
      />

      <div>
        <div className="flex justify-between items-center">
          <h1 className="font-semibold">
            {comment.user?.name || comment.user.email}
          </h1>
          {session?.user.id === comment.userId && (
            <X
              color="gray"
              className="cursor-pointer"
              data-testid="CommentDelete"
              onClick={handleDeleteComment}
              size={20}
            />
          )}
        </div>

        <p className="whitespace-pre-line wrap-break-word">
          {displayedText}
          {isLong && !expanded && "…"}
        </p>

        {isLong && (
          <button
            onClick={() => setExpanded((p) => !p)}
            className="text-blue-500 text-sm cursor-pointer"
          >
            {expanded ? "Hide" : "Read more"}
          </button>
        )}

        <p className="text-gray-400 text-[13px]">
          {formatTime(comment.createdAt)}
        </p>
      </div>
    </div>
  );
};

export default Comment;
