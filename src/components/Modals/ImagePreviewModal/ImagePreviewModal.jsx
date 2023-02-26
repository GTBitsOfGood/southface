import {
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
} from "@chakra-ui/react";
import React from "react";

import Notes from "../../Notes/Notes";
import LgImageCarousel from "./LgImageCarousel";

const ImagePreviewModal = ({ isOpen, onClose, card, setCards }) => {
  return (
    <Modal size="4xl" isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent rounded={14}>
        <ModalCloseButton right={1} top={0} m={2} />
        <ModalBody p="0">
          <HStack alignItems="top" minH="80vh" h="80vh">
            <LgImageCarousel cardImages={card.images} />
            <Notes cardId={card._id} notes={card.notes} setCards={setCards} />
          </HStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ImagePreviewModal;
