"use client";

import NewPostForm from "@/forms/newPostForm";
import CustomModal from "./modal";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
}

const NewPostModal = ({ isOpen, onClose }: IProps) => {
  return (
    <CustomModal isOpen={isOpen} onClose={onClose} title="New post" size="lg">
      <NewPostForm />
    </CustomModal>
  );
};

export default NewPostModal;
