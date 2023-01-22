import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  FormLabel,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { createRef, useState } from "react";

import FilePicker from "chakra-ui-file-picker";
import { uploadFile } from "src/utils/blobStorage";

const ModifyImageModal = ({
  isOpen,
  onClose,
  setImages,
  isAdd,
  currentImageIndex,
  cardId,
}) => {
  const [imageUrl, setImageUrl] = useState("https://picsum.photos/200");
  const [fileList, setFileList] = useState([]);

  const myRef = createRef();

  const upload = () => {
    const file = fileList[0];
    const metadata = {};
    const tags = {
      cardId: cardId,
    };

    uploadFile(file.name, file, metadata, tags).then((res) => {
      setImageUrl(res._response.request.url);
    });
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
          <Box>
            <FilePicker
              onFileChange={(fileList) => setFileList(fileList)}
              placeholder="placeholder"
              clearButtonLabel="Clear Selected Files"
              multipleFiles={false}
              hideClearButton={false}
              ref={myRef}
            />
            <Button onClick={upload}>Upload</Button>
          </Box>
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
