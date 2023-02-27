import {
  Box,
  Button,
  ButtonGroup,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
} from "@chakra-ui/react";
import { formatNoteDateString } from "./utils";

const DeleteNoteModal = ({ isOpen, onClose, note, handleDeleteNote }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered={true}
      size={{ base: "md", xl: "lg", "2xl": "xl" }}
    >
      <ModalOverlay />
      <ModalContent rounded={14}>
        <ModalHeader
          pt={10}
          display="flex"
          justifyContent="center"
          fontSize="lg"
        >
          Are you sure you want to delete this note?
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody display="flex" justifyContent="center">
          <VStack maxW="100%">
            <Box
              minW="60%"
              maxW="80%"
              border="1px solid #cccccc"
              p={3}
              rounded={14}
              mb={4}
            >
              <Text fontSize="sm">{note.body}</Text>
              <Text as="span" color="#6d6e70" fontSize="sm">
                {formatNoteDateString(note.date)}
              </Text>
            </Box>
            <Text justifyContent="center">
              You will be unable to recover it after it is deleted.
            </Text>
          </VStack>
        </ModalBody>

        <ModalFooter justifyContent="center" pb={10}>
          <ButtonGroup>
            <Button
              bgColor="white"
              size="sm"
              rounded={16}
              color="#6d6e70"
              border="solid 1px #6d6e70"
              fontSize="md"
              width="auto"
              onClick={onClose}
            >
              No, return to notes.
            </Button>
            <Button
              colorScheme="Red"
              size="sm"
              rounded={16}
              fontSize="md"
              width="auto"
              onClick={handleDeleteNote}
            >
              Yes, delete note.
            </Button>
          </ButtonGroup>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteNoteModal;
