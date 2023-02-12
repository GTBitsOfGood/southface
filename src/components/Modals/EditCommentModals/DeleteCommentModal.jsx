import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import {
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";

import { updateCardById } from "../../../actions/Card";

const DeleteNoteModal = ({
  isOpen,
  onClose,
  cardId,
  notes,
  currNoteIdx,
  noteBody,
  noteDate,
  setNotes,
  setCards,
}) => {
  // TODO: ensure this logic works
  const handleDeleteNote = async () => {
    const newNotes = notes.filter((_, idx) => idx !== currNoteIdx);

    const updatedCard = await updateCardById(
      cardId,
      {
        notes: newNotes,
      },
      true
    );

    setNotes(newNotes);
    setCards((cards) => {
      return cards.map((card) => {
        if (cardId === card._id) {
          return updatedCard;
        } else {
          return card;
        }
      });
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Delete Note</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text mb={4}>Are you sure you want to delete:</Text>
          <Text fontSize="sm">{noteBody}</Text>
          <Text as="span" color="#6d6e70" fontSize="sm">
            {noteDate}
          </Text>
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
            onClick={handleDeleteNote}
          />
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteNoteModal;
