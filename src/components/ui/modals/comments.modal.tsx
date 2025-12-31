"use client";

import CustomModal from "./modal";
import CommentsSection from "../commentsSection";
import { CommentProps } from "@/types/post";
import { Dispatch, SetStateAction } from "react";

interface IProps {
  isOpen: boolean;
  postId: string;
  onClose: () => void;
  comments: CommentProps[];
  setComments: Dispatch<SetStateAction<CommentProps[]>>;
}

const CommentsModal = ({
  isOpen,
  onClose,
  postId,
  comments,
  setComments,
}: IProps) => {
  return (
    <CustomModal isOpen={isOpen} onClose={onClose} title="Comments" size="lg">
      <CommentsSection
        postId={postId}
        comments={comments}
        setComments={setComments}
      />
    </CustomModal>
  );
};

export default CommentsModal;
