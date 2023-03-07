import { Box, Text, VStack } from "@chakra-ui/react";
import ConfirmActionModal from "../Modals/ConfirmActionModal";
import { formatNoteDateString } from "./utils";

const DeleteNoteModal = ({ isOpen, onClose, note, handleDeleteNote }) => {
  return (
    <ConfirmActionModal
      isOpen={isOpen}
      onClose={onClose}
      mainText="Are you sure you want to delete this note?"
      subText="You will be unable to recover it after it is deleted."
      confirmButtonText="Yes, delete note."
      cancelButtonText="No, return to notes."
      handleAction={handleDeleteNote}
      isDanger={true}
    >
      <VStack maxW="full">
        <Box
          minW="60%"
          maxW="80%"
          border="1px solid #cccccc"
          p={3}
          rounded={14}
          mb={4}
        >
          <Text fontSize="sm">{note.body}</Text>
          <Text as="span" color="Grey" fontSize="sm">
            {formatNoteDateString(note.date)}
          </Text>
        </Box>
      </VStack>
    </ConfirmActionModal>
  );
};

export default DeleteNoteModal;
