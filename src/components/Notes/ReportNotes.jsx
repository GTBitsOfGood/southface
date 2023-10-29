import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Flex,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import useUser from "../../lib/hooks/useUser";
import Note from "./Note";

export default function ReportNotes({
  currentNotes,
  noteToggleHandler,
  handleSaveEdit,
  createNewNote,
  newNote,
  setNewNote,
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

  const {
    isOpen: isOpenAddNote,
    onOpen: onOpenAddNote,
    onClose: onCloseAddNote,
  } = useDisclosure();

  return (
    <VStack alignItems="left">
      <VStack alignItems="left" w="100%">
        <Flex
          width="100%"
          flexFlow="row nowrap"
          justifyContent="space-between"
          gap={2}
        >
          <Heading textColor="#3F3F3F" size="md" mt={3} mb={-2}>
            Notes ({currentNotes.length})
          </Heading>
          <Button
            minW="20%"
            position="absolute"
            right="12"
            variant="Blue-rounded"
            onClick={() => {
              setNewNote({ body: "", date: new Date() });
              onOpenAddNote();
            }}
          >
            Add Note
          </Button>
        </Flex>
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

      <Modal
        isOpen={isOpenAddNote}
        onClose={onCloseAddNote}
        size={{ base: "xs", md: "2xl", lg: "4xl" }}
      >
        <ModalOverlay />
        <ModalContent rounded={14}>
          <ModalHeader mt={10} mx={6}>
            <Flex justify="center">Add Note</Flex>
          </ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <Box border="1px solid #cccccc" p={3} mb={2} rounded={14}>
              <Textarea
                placeholder="Add a new note..."
                color="Grey"
                value={newNote.body}
                fontSize="sm"
                onChange={(e) =>
                  setNewNote({ ...newNote, body: e.target.value })
                }
                border={0}
                style={{ resize: "none" }}
                height="16"
              />
              <Text mt={1} color="blue.400" fontWeight="bold" fontSize="small">
                {new Date().toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </Text>
            </Box>
            <Flex justify="end" experimental_spaceX={2}>
              <Button
                minW="20%"
                variant="Grey-outlined"
                onClick={onCloseAddNote}
              >
                Cancel
              </Button>
              <Button
                minW="20%"
                variant={newNote.body ? "Blue" : "Grey"}
                onClick={() => {
                  createNewNote();
                  setNewNote({ body: "", date: new Date() });
                  onCloseAddNote();
                }}
                isDisabled={!newNote.body}
              >
                Done
              </Button>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </VStack>
  );
}
