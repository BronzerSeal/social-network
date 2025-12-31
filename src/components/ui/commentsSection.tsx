"use client";
import NewCommentForm from "@/forms/newCommentForm";

import Comment from "../common/Comment";
import { CommentProps } from "@/types/post";
import { Pagination } from "@heroui/react";
import { Dispatch, SetStateAction, useState } from "react";

interface Props {
  postId: string;
  comments: CommentProps[];
  setComments: Dispatch<SetStateAction<CommentProps[]>>;
}

const CommentsSection = ({ postId, comments, setComments }: Props) => {
  const perPage = 3;

  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(comments.length / perPage);

  const paginatedComments = comments.slice(
    (page - 1) * perPage,
    page * perPage
  );
  return (
    <div>
      {paginatedComments.map((comment) => (
        <div key={comment.id} className="flex flex-col mt-1">
          <Comment
            comment={comment}
            setComments={setComments}
            comments={comments}
          />
        </div>
      ))}

      {totalPages > 1 && (
        <Pagination
          className="my-2"
          page={page}
          onChange={setPage}
          total={totalPages}
        />
      )}

      <NewCommentForm postId={postId} setComments={setComments} />
    </div>
  );
};

export default CommentsSection;
