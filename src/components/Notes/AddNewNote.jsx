import {
  Box,
  Editable,
  EditableInput,
  EditablePreview,
  useColorModeValue,
} from "@chakra-ui/react";
import { useRef } from "react";

const AddNewNote = ({ newNote, setNewNote, submitNewNote }) => {
  const newNoteRef = useRef();

  const handleChange = (val) => {
    setNewNote({ body: val, date: new Date() });
  };

  const onKeyPress = (e) => {
    if (document.activeElement === newNoteRef.current && e.key == "Enter") {
      submitNewNote();
      setNewNote({ body: "", date: "" });
    }
  };

  return (
    <Box border="1px solid #cccccc" p={3} mb={2} rounded={14}>
      <Editable
        placeholder="Add a new note..."
        color="#6d6e70"
        value={newNote.body}
        fontSize="sm"
        onChange={(val) => handleChange(val)}
        onKeyDown={onKeyPress}
      >
        <EditablePreview
          w="100%"
          _hover={{
            background: useColorModeValue("gray.100", "gray.700"),
          }}
        />
        <EditableInput ref={newNoteRef} pl={1} pr={1} />
      </Editable>
    </Box>
  );
};

export default AddNewNote;
