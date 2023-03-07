import {
  Box,
  Editable,
  EditableInput,
  EditablePreview,
  IconButton,
  useColorModeValue,
  useEditableControls,
} from "@chakra-ui/react";
import { useRef } from "react";
import useUser from "../../lib/hooks/useUser";

import { MdUpload } from "react-icons/md";

const AddNewNote = ({ newNote, setNewNote, createNewNote }) => {
  const newNoteRef = useRef();

  const { user } = useUser();

  const handleChange = (val) => {
    setNewNote({ body: val, userId: user.id, date: new Date() });
  };

  const EditableControls = () => {
    const { isEditing, getSubmitButtonProps } = useEditableControls();

    return (
      isEditing && (
        <IconButton
          icon={<MdUpload />}
          size="sm"
          bg="none"
          w="1.5rem"
          h="1.5rem"
          minWidth="auto"
          minH="auto"
          position="absolute"
          mr=".2rem"
          {...getSubmitButtonProps()}
        />
      )
    );
  };

  return (
    <Box border="1px solid #cccccc" p={3} mb={2} rounded={14}>
      <Editable
        placeholder="Add a new note..."
        color="Grey"
        value={newNote.body}
        fontSize="sm"
        onChange={(val) => handleChange(val)}
        submitOnBlur={false}
        onSubmit={() => {
          createNewNote();
          setNewNote({ body: "", date: "" });
        }}
        display="flex"
        alignItems="center"
        justifyContent="end"
      >
        <EditablePreview
          w="100%"
          _hover={{
            background: useColorModeValue("gray.100", "gray.700"),
          }}
        />
        <EditableInput ref={newNoteRef} pl={1} pr={8} />
        <EditableControls />
      </Editable>
    </Box>
  );
};

export default AddNewNote;
