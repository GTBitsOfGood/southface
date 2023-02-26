import { Heading, VStack } from "@chakra-ui/react";
import Image from "next/image";
import DeleteModal from "./DeleteModal";

const DeleteImageModal = ({
  isOpen,
  onClose,
  image,
  index,
  handleDeleteImage,
}) => {
  return (
    <DeleteModal
      isOpen={isOpen}
      onClose={onClose}
      modalBody={
        <VStack>
          <Heading size="xs" color="#6D6E70" fontWeight="semibold" mb={1}>
            {image.name}
          </Heading>
          <Image
            src="https://user-images.githubusercontent.com/69729390/214123449-126291c9-2cde-4773-90b7-a54a38336553.png"
            height={125}
            width={125}
            alt="construction image"
          />
        </VStack>
      }
      headerText="Are you sure you want to delete this image?"
      closeText="No, return to standard."
      submitText="Yes, delete image."
      onSubmit={() => {
        handleDeleteImage(index);
        onClose();
      }}
    />
  );
};

export default DeleteImageModal;
