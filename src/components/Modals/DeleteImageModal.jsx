import { Heading, VStack } from "@chakra-ui/react";
import Image from "next/image";
import { DEFAULT_IMAGE } from "src/lib/utils/constants";
import ConfirmActionModal from "./ConfirmActionModal/ConfirmActionModal";

const DeleteImageModal = ({
  isOpen,
  onClose,
  image,
  index,
  handleDeleteImage,
}) => {
  return (
    <ConfirmActionModal
      isOpen={isOpen}
      onClose={onClose}
      mainText="Are you sure you want to delete this image?"
      subText={true}
      confirmButtonText="Yes, delete image."
      cancelButtonText="No, return to standard."
      handleAction={() => {
        handleDeleteImage(index);
        onClose();
      }}
      isDanger={true}
    >
      <VStack>
        <Heading size="xs" color="Grey" fontWeight="semibold" mb={1}>
          {image.name}
        </Heading>
        <Image
          src={DEFAULT_IMAGE}
          height={125}
          width={125}
          alt="construction image"
        />
      </VStack>
    </ConfirmActionModal>
  );
};

export default DeleteImageModal;
