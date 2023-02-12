import {
  Box,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  IconButton,
  SimpleGrid,
  Text,
  useDisclosure,
  useEditableControls,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { IoMdTrash } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import useUser from "src/lib/hooks/useUser";
// import { updateCardById } from "../../actions/Card";
// import AddCommentModal from "../Modals/EditCommentModals/AddCommentModal";
import DeleteCommentModal from "../Modals/EditCommentModals/DeleteCommentModal";

const Note = ({
  cardId,
  currNoteIdx,
  note,
  //   handleCommentsUpdate,
  //   setComments,
  setCards,
}) => {
  const [currNote, setCurrNote] = useState(note.body);

  const { ifAdmin } = useUser();

  useEffect(() => {
    setCurrNote(note.body);
  }, [note]);

  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();

  const formatDateString = (date) => {
    const dateAsArr = new Date(date).toDateString().split(" ");

    return dateAsArr[1] + " " + dateAsArr[2] + ", " + dateAsArr[3];
  };

  const EditButton = () => {
    const { getEditButtonProps } = useEditableControls();

    return (
      <IconButton
        icon={<MdEdit />}
        size="sm"
        bg="none"
        w="24px"
        h="24px"
        minWidth="auto"
        minH="auto"
        {...getEditButtonProps()}
      />
    );
  };

  return (
    <Box border="1px solid #cccccc" p={3} rounded={14}>
      <Editable
        placeholder="This note is empty!"
        value={currNote}
        isPreviewFocusable={false}
        selectAllOnFocus={false}
        onChange={(val) => setCurrNote(val)}
        // TODO: Add submit logic
        onSubmit={() => console.log("submitted")}
      >
        <EditablePreview mb={1} />
        <EditableInput mb={1} />
        <SimpleGrid columns={2}>
          <Flex alignItems="center">
            <Text as="span" color="#6d6e70" fontSize="sm">
              {formatDateString(note.date)}
            </Text>
          </Flex>
          <Flex justifyContent="right" gap={1}>
            <EditButton />

            <IconButton
              icon={<IoMdTrash />}
              size="sm"
              bg="none"
              w="24px"
              h="24px"
              minWidth="auto"
              minH="auto"
              onClick={() => ifAdmin(onDeleteOpen)}
            />

            <DeleteCommentModal
              isOpen={isDeleteOpen}
              onClose={onDeleteClose}
              cardId={cardId}
              currNoteIdx={currNoteIdx}
              noteBody={note.body}
              noteDate={formatDateString(note.date)}
              // setComments={setComments}
              setCards={setCards}
            />
          </Flex>
        </SimpleGrid>
      </Editable>
    </Box>
  );
};

export default Note;
