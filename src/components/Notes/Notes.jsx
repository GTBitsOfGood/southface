import { Box, Flex, Heading, HStack, Text, VStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

import { updateCardById } from "../../actions/Card";
import useActiveReport from "../../lib/hooks/useActiveReport";
import useUser from "../../lib/hooks/useUser";
import AddNewNote from "./AddNewNote";
import Note from "./Note";
import SentimentButton from "./SentimentButton";

const Notes = ({ cardId, notes, setCards, ...rest }) => {
  const [currentNotes, setCurrentNotes] = useState(
    notes.map((n) => n).reverse()
  );
  const [newNote, setNewNote] = useState({ body: "", userId: "", date: "" });

  const { user } = useUser();

  useEffect(() => {
    setCurrentNotes(notes.map((c) => c).reverse());
  }, [notes]);

  const handleSaveEdit = async (newNotes) => {
    const updatedCard = await updateCardById(cardId, {
      notes: newNotes.map((n) => n).reverse(),
    });
    setCards((cards) => {
      return cards.map((card) => {
        if (cardId === card._id) {
          return updatedCard;
        } else {
          return card;
        }
      });
    });
  };

  const createNewNote = async () => {
    if (newNote.body === "") {
      return;
    }
    const newNotes = notes.concat(newNote);
    const updatedCard = await updateCardById(cardId, {
      notes: newNotes,
    });

    setCards((cards) => {
      return cards.map((card) => {
        if (cardId === card._id) {
          return updatedCard;
        } else {
          return card;
        }
      });
    });
  };

  const { changeInReport } = useActiveReport();
  const { selState } = { ...rest };
  const noteArr = (function () {
    if (selState && selState.noteSelections.length === notes.length) {
      return selState.noteSelections;
    } else {
      return Array(notes.length).fill(false);
    }
  })();

  const noteToggleHandler = (index) => () => {
    if (selState) {
      noteArr[index] = !noteArr[index];
      const newSel = { ...selState };
      newSel.noteSelections = noteArr;
      changeInReport(newSel);
    }
  };

  if (!user?.isLoggedIn) {
    return (
      <Box>
        <Heading size="lg" mt={3} mb={2}>
          Notes
        </Heading>
        <Text>Login to view notes</Text>
      </Box>
    );
  }

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
              <Note
                onClick={noteToggleHandler(index)}
                borderWidth={selState?.noteSelections[index] ? "10px" : "0px"}
                borderColor={
                  selState?.noteSelections[index] ? "red.500" : "none"
                }
                key={index}
                currNoteIdx={index}
                note={note}
                notes={currentNotes}
                handleSaveEdit={handleSaveEdit}
              />
            );
          })}
        </Box>
      </VStack>

      <Flex alignItems="end">
        <VStack alignItems="left">
          <Text>Was this image helpful?</Text>
          <HStack>
            <SentimentButton type="like" />
            <SentimentButton type="dislike" />
          </HStack>
        </VStack>
      </Flex>
    </VStack>
  );
};

export default Notes;
