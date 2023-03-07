import {
  Box,
  Button,
  ButtonGroup,
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
import DeleteNoteModal from "./DeleteNoteModal";
import { formatNoteDateString } from "./utils";

const Note = ({ currNoteIdx, handleSaveEdit, note, notes, ...props }) => {
  const [currNote, setCurrNote] = useState(note.body);

  const noteRef = useRef();

  useEffect(() => {
    setCurrNote(note.body);
  }, [note]);

  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();

  const handleEdit = () => {
    if (currNote === "") {
      setCurrNote(note.body);
      return;
    }
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

  const Toolbar = () => {
    const {
      isEditing,
      getCancelButtonProps,
      getEditButtonProps,
      getSubmitButtonProps,
    } = useEditableControls();

    return isEditing ? (
      <ButtonGroup display="flex" justifyContent="end" mt={1}>
        <Button
          bgColor="white"
          size="xs"
          rounded={16}
          color="Grey"
          border="solid 1px Grey"
          fontSize="sm"
          width="auto"
          {...getCancelButtonProps()}
        >
          Cancel
        </Button>
        <Button
          bgColor="#03acc8"
          _hover={{
            bgColor: "#029ab5",
          }}
          color="white"
          size="xs"
          rounded={16}
          fontSize="sm"
          width="auto"
          {...getSubmitButtonProps()}
        >
          Save changes
        </Button>
      </ButtonGroup>
    ) : (
      <SimpleGrid columns={2}>
        <Flex alignItems="center">
          <Text as="span" color="Grey" fontSize="sm">
            {formatNoteDateString(note.date)}
          </Text>
        </Flex>
        <Flex justifyContent="right" gap={1}>
          <ButtonGroup>
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
            <IconButton
              icon={<IoMdTrash />}
              size="sm"
              bg="none"
              w="1.5rem"
              h="1.5rem"
              minWidth="auto"
              minH="auto"
              onClick={onDeleteOpen}
            />
          </ButtonGroup>
        </Flex>
      </SimpleGrid>
    );
  };

  return (
    <Box border="1px solid #cccccc" p={3} mb={2} rounded={14} {...props}>
      <Editable
        placeholder="This note is empty!"
        value={currNote}
        isPreviewFocusable={false}
        selectAllOnFocus={false}
        onChange={(val) => setCurrNote(val)}
        submitOnBlur={false}
        onSubmit={handleEdit}
      >
        <EditablePreview mb={1} maxW="100%" />
        <EditableInput mb={1} pl={1} pr={1} ref={noteRef} />
        <Toolbar />
      </Editable>
      <DeleteNoteModal
        isOpen={isDeleteOpen}
        onClose={onDeleteClose}
        note={note}
        handleDeleteNote={handleDeleteNote}
      />
    </Box>
  );
};

export default Note;
