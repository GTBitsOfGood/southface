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
import React, { useEffect, useRef, useState } from "react";
import { IoMdTrash } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import useUser from "src/lib/hooks/useUser";
import DeleteNoteModal from "./DeleteNoteModal";
import { formatNoteDateString } from "./utils";

const Note = ({ currNoteIdx, handleSaveEdit, note, notes }) => {
  const [currNote, setCurrNote] = useState(note.body);

  const noteRef = useRef();

  const { ifAdmin } = useUser();

  useEffect(() => {
    setCurrNote(note.body);
  }, [note]);

  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();

  const handleEdit = () => {
    const newNotes = notes.map((n, idx) => {
      if (idx === currNoteIdx) {
        n.body = currNote;
        n.date = new Date();
      }
      return n;
    });

    handleSaveEdit(newNotes);
  };

  const handleDeleteNote = () => {
    onDeleteClose();

    const newNotes = notes.filter((_, idx) => idx !== currNoteIdx);

    handleSaveEdit(newNotes);
  };

  const EditButton = () => {
    const { getEditButtonProps } = useEditableControls();

    return (
      <IconButton
        icon={<MdEdit />}
        size="sm"
        bg="none"
        w="1.5rem"
        h="1.5rem"
        minWidth="auto"
        minH="auto"
        {...getEditButtonProps()}
      />
    );
  };

  return (
    <Box border="1px solid #cccccc" p={3} mb={2} rounded={14}>
      <Editable
        placeholder="This note is empty!"
        value={currNote}
        isPreviewFocusable={false}
        selectAllOnFocus={false}
        onChange={(val) => setCurrNote(val)}
        onSubmit={handleEdit}
      >
        <EditablePreview mb={1} />
        <EditableInput mb={1} pl={1} pr={1} ref={noteRef} />
        <SimpleGrid columns={2}>
          <Flex alignItems="center">
            <Text as="span" color="#6d6e70" fontSize="sm">
              {formatNoteDateString(note.date)}
            </Text>
          </Flex>
          <Flex justifyContent="right" gap={1}>
            <EditButton />

            <IconButton
              icon={<IoMdTrash />}
              size="sm"
              bg="none"
              w="1.5rem"
              h="1.5rem"
              minWidth="auto"
              minH="auto"
              onClick={() => ifAdmin(onDeleteOpen)}
            />

            <DeleteNoteModal
              isOpen={isDeleteOpen}
              onClose={onDeleteClose}
              note={note}
              handleDeleteNote={handleDeleteNote}
            />
          </Flex>
        </SimpleGrid>
      </Editable>
    </Box>
  );
};

export default Note;
