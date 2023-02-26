import { Box, Text, VStack } from "@chakra-ui/react";
import DeleteModal from "../Modals/DeleteModal";
import { formatNoteDateString } from "./utils";

const DeleteNoteModal = ({ isOpen, onClose, note, handleDeleteNote }) => {
  return (
    <DeleteModal
      isOpen={isOpen}
      onClose={onClose}
      modalBody={
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
      }
      headerText="Are you sure you want to delete this note?"
      closeText="No, return to notes."
      submitText="Yes, delete note."
      onSubmit={handleDeleteNote}
    />
  );
};

export default DeleteNoteModal;
