"use client";

import UserchangeAvatarForm from "@/forms/userInfoForm";
import CustomModal from "./modal";
import UserChangeAvatarForm from "@/forms/userInfoForm";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
}

const NewUserAvatar = ({ isOpen, onClose }: IProps) => {
  return (
    <CustomModal
      isOpen={isOpen}
      onClose={onClose}
      title="Change avatar"
      size="lg"
    >
      <UserChangeAvatarForm onClose={onClose} />
    </CustomModal>
  );
};

export default NewUserAvatar;
