import {
  Box,
  Editable,
  EditablePreview,
  EditableInput,
  useColorModeValue,
} from "@chakra-ui/react";

const AddNewNote = ({ newNote, setNewNote }) => {
  return (
    <Box border="1px solid #cccccc" p={3} rounded={14}>
      <Editable
        placeholder="Add a new note..."
        color="#6d6e70"
        value={newNote}
        fontSize="sm"
        onChange={(val) => setNewNote(val)}
        // TODO: Add submit logic
        onSubmit={() => console.log("submitted")}
      >
        <EditablePreview
          _hover={{
            background: useColorModeValue("gray.100", "gray.700"),
          }}
        />
        <EditableInput />
      </Editable>
    </Box>
  );
};

export default AddNewNote;
