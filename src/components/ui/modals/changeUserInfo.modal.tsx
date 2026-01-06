"use client";

import UserChangeInfoForm from "@/forms/UserChangeInfoForm copy";
import CustomModal from "./modal";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChangeUserInfo = ({ isOpen, onClose }: IProps) => {
  return (
    <CustomModal
      isOpen={isOpen}
      onClose={onClose}
      title="Change info"
      size="lg"
    >
      <UserChangeInfoForm onClose={onClose} />
    </CustomModal>
  );
};

export default ChangeUserInfo;
