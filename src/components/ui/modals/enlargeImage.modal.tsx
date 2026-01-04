import { Modal, ModalBody, ModalContent } from "@heroui/react";

interface Props {
  isImageOpen: boolean;
  onImageClose: () => void;
  previewImage: string | null;
}

const EnlargeImageModal = ({
  isImageOpen,
  onImageClose,
  previewImage,
}: Props) => {
  return (
    <Modal
      isOpen={isImageOpen}
      onClose={onImageClose}
      size="full"
      backdrop="transparent"
      motionProps={{
        variants: {
          enter: { opacity: 1 },
          exit: { opacity: 0 },
        },
      }}
      className=" bg-black/60"
      hideCloseButton={true}
    >
      <ModalContent>
        {() => (
          <ModalBody
            onClick={(e) => {
              if (e.target === e.currentTarget) onImageClose();
            }}
            className="flex items-center justify-center"
          >
            {previewImage && (
              <img
                src={previewImage}
                className="max-h-[90vh] max-w-[95vw] object-contain rounded-xl shadow-lg"
              />
            )}
          </ModalBody>
        )}
      </ModalContent>
    </Modal>
  );
};

export default EnlargeImageModal;
