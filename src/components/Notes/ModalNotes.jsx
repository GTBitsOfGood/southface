import { AddIcon, CloseIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Circle,
  Flex,
  Heading,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";
import useUser from "../../lib/hooks/useUser";
import AddNewNote from "./AddNewNote";
import Note from "./Note";
import SentimentButton from "./SentimentButton";

export default function ModalNotes({
  selState,
  currentNotes,
  newNote,
  setNewNote,
  createNewNote,
  noteToggleHandler,
  editing,
  handleSaveEdit,
  editHandler,
}) {
  const { user } = useUser();
  return (
    <VStack h="80vh" w="35%" p="5% 2% 5% 2%" alignItems="left">
      <VStack alignItems="left" w="100%" pb={10}>
        <Heading size="lg" mt={3} mb={2}>
          Notes
        </Heading>

        <Box h="50vh" overflowY="scroll">
          {user?.isLoggedIn && (
            <AddNewNote
              newNote={newNote}
              setNewNote={setNewNote}
              createNewNote={createNewNote}
            />
          )}

          {currentNotes.map((note, index) => {
            if (!user?.isAdmin && note.userId !== user?.id) {
              return;
            }
            return (
              <Box
                key={index}
                handleSaveEdit={handleSaveEdit}
                position="relative"
              >
                <Note
                  onClick={noteToggleHandler(index)}
                  borderWidth={
                    selState?.noteSelections[index] && editing ? "5px" : "1px"
                  }
                  borderColor={
                    selState?.noteSelections[index] && editing
                      ? "blue.500"
                      : "#ccccc"
                  }
                  currNoteIdx={index}
                  note={note}
                  notes={currentNotes}
                  handleSaveEdit={handleSaveEdit}
                />
                {editing && (
                  <Circle
                    position="absolute"
                    bottom="10px"
                    bgColor="blue.500"
                    color="white"
                    right="10px"
                    zIndex={5}
                    padding={2}
                  >
                    {selState?.noteSelections[index] ? (
                      <CloseIcon />
                    ) : (
                      <AddIcon />
                    )}
                  </Circle>
                )}
              </Box>
            );
          })}
        </Box>
      </VStack>

      <Flex alignItems="end">
        <VStack alignItems="left" w="80%">
          <Text>Was this image helpful?</Text>
          <HStack justify="space-between">
            <HStack>
              <SentimentButton type="like" />
              <SentimentButton type="dislike" />
            </HStack>
            {selState && (
              <Button variant="Blue-rounded" onClick={editHandler}>
                {editing ? "Save Changes" : "Add notes"}
              </Button>
            )}
          </HStack>
        </VStack>
      </Flex>
    </VStack>
  );
}
