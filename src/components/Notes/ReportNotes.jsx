import {
  Box,
  Heading,
  VStack,
} from "@chakra-ui/react";
import useUser from "../../lib/hooks/useUser";
import Note from "./Note";

export default function ReportNotes({
  currentNotes,
  noteToggleHandler,
  handleSaveEdit,
}) {
  const { user } = useUser();
  return (
    <VStack alignItems="left">
      <VStack alignItems="left" w="100%" pb={10}>
        <Heading size="lg" mt={3} mb={2}>
          Notes
        </Heading>

        <Box>
          {currentNotes.map((note, index) => {
            if (!user?.isAdmin && note.userId !== user?.id) {
              return;
            }
            return (
              <Note
                key={index}
                onClick={noteToggleHandler(index)}
                borderColor="transparent"
                currNoteIdx={index}
                note={note}
                notes={currentNotes}
                handleSaveEdit={handleSaveEdit}
              />
            );
          })}
        </Box>
      </VStack>
    </VStack>
  );
}
