import {
  Box,
  Flex,
  Heading,
  HStack,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

import { updateCardById } from "../../actions/Card";
import useUser from "../../lib/hooks/useUser";
import AddNewNote from "./AddNewNote";
import Note from "./Note";
import { SentimentButton } from "./utils";

const Notes = ({ cardId, notes, setCards }) => {
  const [currentNotes, setCurrentNotes] = useState(
    notes.map((n) => n).reverse()
  );
  const [newNote, setNewNote] = useState({ body: "", userId: "", date: "" });

  const { user } = useUser();

  useEffect(() => {
    setCurrentNotes(notes.map((c) => c).reverse());
  }, [notes]);

  const handleSaveEdit = async (newNotes) => {
    const updatedCard = await updateCardById(
      cardId,
      { notes: newNotes.map((n) => n).reverse() },
      true
    );
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
    const newNotes = notes.concat(newNote);
    const updatedCard = await updateCardById(
      cardId,
      {
        notes: newNotes,
      },
      true
    );

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

  return (
    <SimpleGrid rows={2} gap={2} h="80vh" w="35%" p="5% 2% 5% 2%">
      <VStack alignItems="left">
        <Heading size="lg" mt={3} mb={2}>
          Notes
        </Heading>

        <Box h="50vh" pr={1} overflowY="scroll">
          <AddNewNote
            newNote={newNote}
            setNewNote={setNewNote}
            createNewNote={createNewNote}
          />

          {currentNotes.map((note, index) => {
            if (!user.isAdmin && note.userId !== user.id) {
              return;
            }
            return (
              <Note
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
    </SimpleGrid>
  );
};

export default Notes;
