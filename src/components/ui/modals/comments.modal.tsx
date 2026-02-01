"use client";

import CustomModal from "./modal";
import CommentsSection from "../commentsSection";
import { CommentProps } from "@/types/post";

interface IProps {
  isOpen: boolean;
  postId: string;
  onClose: () => void;
  comments: CommentProps[];
}

const CommentsModal = ({ isOpen, onClose, postId, comments }: IProps) => {
  return (
    <CustomModal isOpen={isOpen} onClose={onClose} title="Comments" size="lg">
      <CommentsSection postId={postId} comments={comments} />
    </CustomModal>
  );
};

export default CommentsModal;
