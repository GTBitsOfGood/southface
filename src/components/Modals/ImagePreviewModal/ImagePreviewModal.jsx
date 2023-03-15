import {
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

import Notes from "../../Notes/Notes";
import LgImageCarousel from "./LgImageCarousel";

const ImagePreviewModal = ({
  isOpen,
  onClose,
  card,
  setCards,
  currentImageIndex,
  setSelectedImage,
  ...rest
}) => {
  const { selState } = { ...rest };
  const [editing, setEditing] = useState(false);
  // const [currentImage, setCurrentImage] = useState(0);

  // useEffect(() => {
  //   setCurrentImage(currentImageIndex);
  //   console.log("This is the index in image preview " + currentImageIndex);
  // }, [currentImageIndex]);

  useEffect(() => {
    if (!selState) {
      setEditing(false);
    }
  }, [selState]);
  const modalCloseHandler = () => {
    setEditing(() => {
      onClose();
      return false;
    });
  };

  return (
    <Modal size="4xl" isOpen={isOpen} onClose={modalCloseHandler}>
      <ModalOverlay />
      <ModalContent rounded={14}>
        <ModalCloseButton right={1} top={0} m={2} />
        <ModalBody p="0">
          <HStack alignItems="top" minH="80vh" h="80vh">
            <LgImageCarousel
              cardImages={card.images}
              currentImage={currentImageIndex}
              setCurrentImage={setSelectedImage}
            />
            <Notes
              selState={selState}
              cardId={card._id}
              notes={card.notes}
              setCards={setCards}
              editing={editing}
              setEditing={setEditing}
              cardImages={card.images}
              currentImage={currentImageIndex}
            />
          </HStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ImagePreviewModal;
