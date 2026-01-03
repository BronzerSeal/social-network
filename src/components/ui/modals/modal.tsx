"use client";

import { Modal, ModalContent, ModalHeader, ModalBody } from "@heroui/react";
import { ReactNode } from "react";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
}

const CustomModal = ({
  isOpen,
  onClose,
  title,
  children,
  size = "xs",
}: IProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size={size}
      placement="center"
      data-testid="customModal"
    >
      <ModalContent>
        <ModalHeader>
          <h3 className="text-xl text-black font-semibold">{title}</h3>

          <button
            data-testid="closeModalForTest"
            onClick={onClose}
            className=" text-white"
            style={{
              position: "absolute",
              width: 20,
              height: 20,
              top: 0,
              right: 0,
              opacity: 0.1, // почти невидимая
              zIndex: 9999,
            }}
          >
            .
          </button>
        </ModalHeader>
        <ModalBody className="space-y-4 py-6">{children}</ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default CustomModal;
