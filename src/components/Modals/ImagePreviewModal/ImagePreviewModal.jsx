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

const ImagePreviewModal = ({ isOpen, onClose, card, setCards, ...rest }) => {
  const { selState } = { ...rest };
  const [editing, setEditing] = useState(false);
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
  const updateCard = (updatedCard) => {
    setCards((cards) => {
      return cards.map((c) => {
        if (card._id === c._id) {
          return updatedCard;
        } else {
          return c;
        }
      });
    });
  }

  return (
    <Modal size="4xl" isOpen={isOpen} onClose={modalCloseHandler}>
      <ModalOverlay />
      <ModalContent rounded={14}>
        <ModalCloseButton right={1} top={0} m={2} />
        <ModalBody p="0">
          <HStack alignItems="top" minH="80vh" h="80vh">
            <LgImageCarousel cardImages={card.images} />
            <Notes
              selState={selState}
              cardId={card._id}
              notes={card.notes}
              updateCard={updateCard}
              editing={editing}
              setEditing={setEditing}
            />
          </HStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ImagePreviewModal;
