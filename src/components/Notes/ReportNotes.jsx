import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
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
  const firstTwo = currentNotes.slice(0, 2);
  const remaining = currentNotes.slice(2);
  const notesMapper = (note, index) => {
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
        isReportNote={true}
      />
    );
  };
  const accordionHeader = (isExpanded) =>
    isExpanded ? (
      <>
        View less notes <ChevronUpIcon />
      </>
    ) : (
      <>
        View {remaining.length} more note{remaining.length !== 1 && "s"}{" "}
        <ChevronDownIcon />
      </>
    );

  return (
    <VStack alignItems="left">
      <VStack alignItems="left" w="100%">
        <Heading textColor="#3F3F3F" size="md" mt={3} mb={-2}>
          Notes ({currentNotes.length})
        </Heading>
        {currentNotes.length === 0 ? (
          <Box fontStyle="italic" color="Gray">
            No notes added to report
          </Box>
        ) : (
          <Box>
            {firstTwo.map(notesMapper)}
            {remaining.length !== 0 && (
              <Accordion allowToggle allowMultiple>
                <AccordionItem border="none">
                  {({ isExpanded }) => {
                    return (
                      <>
                        <AccordionPanel p={0}>
                          {remaining.map(notesMapper)}
                        </AccordionPanel>
                        <AccordionButton pl={0} color="Blue">
                          {accordionHeader(isExpanded)}
                        </AccordionButton>
                      </>
                    );
                  }}
                </AccordionItem>
              </Accordion>
            )}
          </Box>
        )}
      </VStack>
    </VStack>
  );
}
