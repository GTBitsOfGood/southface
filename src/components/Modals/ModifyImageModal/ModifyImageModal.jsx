import {
  ModalOverlay,
  ModalContent,
  ModalHeader,
  Modal,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Input,
  FormLabel,
  IconButton,
} from "@chakra-ui/react";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";

import { useState } from "react";

const ModifyImageModal = ({
  isOpen,
  onClose,
  setImages,
  isAdd,
  imageProp,
  currentImageIndex,
}) => {
  const [imageUrl, setImageUrl] = useState("https://picsum.photos/200");

  const handleChange = (e) => {
    setImageUrl(e.target.value);
  };

  const handleAddSubmit = () => {
    setImages((images) => {
      if (images) {
        return [...images, imageUrl];
      } else {
        return [imageUrl];
      }
    });

    onClose();
  };

  const handleEditSubmit = () => {
    setImages((images) => {
      return images.map((image, index) => {
        if (index === currentImageIndex) {
          return imageUrl;
        } else {
          return image;
        }
      });
    });

    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{isAdd ? "Add Image" : "Edit Image"}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormLabel>{isAdd ? "Enter Image Url" : "Edit Image Url"}</FormLabel>
          <Input
            onChange={handleChange}
            defaultValue={isAdd ? "https://picsum.photos/200" : imageProp}
          />
        </ModalBody>

        <ModalFooter>
          <IconButton
            icon={<CloseIcon />}
            colorScheme="blue"
            mr={3}
            onClick={onClose}
          />
          <IconButton
            icon={<CheckIcon />}
            colorScheme="blue"
            mr={3}
            onClick={isAdd ? handleAddSubmit : handleEditSubmit}
          />
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModifyImageModal;
