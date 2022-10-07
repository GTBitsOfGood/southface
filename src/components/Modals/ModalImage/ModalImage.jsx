import { Image, Flex, IconButton, useDisclosure, Box } from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";

import ModifyImageModal from "../ModifyImageModal";

const ModalImage = ({
  isEditing,
  image,
  currentImageIndex,
  setImages,
  ...props
}) => {
  const {
    isOpen: editImageIsOpen,
    onOpen: editImageOnOpen,
    onClose: editImageOnClose,
  } = useDisclosure();

  const onDeleteImage = () => {
    setImages((images) => {
      return images.filter((_, index) => index !== currentImageIndex);
    });
  };

  return (
    <Box position="relative" {...props}>
      <Image
        src={image}
        objectFit="cover"
        boxSize={isEditing ? "3xs" : "2xs"}
        boxShadow="dark-lg"
        alt={"card image"}
      />
      {isEditing && (
        <Flex justifyContent="center" gap={2} m={2}>
          <IconButton
            icon={<EditIcon />}
            boxShadow="base"
            onClick={editImageOnOpen}
          />
          <IconButton
            icon={<DeleteIcon />}
            boxShadow="base"
            onClick={onDeleteImage}
          />
          <ModifyImageModal
            isOpen={editImageIsOpen}
            onClose={editImageOnClose}
            isAdd={false}
            currentImageIndex={currentImageIndex}
            imageProp={image}
            setImages={setImages}
          />
        </Flex>
      )}
    </Box>
  );
};

export default ModalImage;
