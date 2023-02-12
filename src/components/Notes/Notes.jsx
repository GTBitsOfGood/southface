import {
  Flex,
  Heading,
  HStack,
  IconButton,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Note from "./Note";
import { MdOutlineThumbUpAlt, MdOutlineThumbDownAlt } from "react-icons/md";
import AddNewNote from "./AddNewNote";

const SentimentButton = (props) => {
  const styles = {
    bg: "none",
    _hover: { bg: "none" },
    w: "24px",
    h: "24px",
    minWidth: "auto",
    minH: "auto",
  };
  if (props.type == "like") {
    return (
      <IconButton icon={<MdOutlineThumbUpAlt color="#03acc8" />} {...styles} />
    );
  } else if (props.type == "dislike") {
    return (
      <IconButton
        icon={<MdOutlineThumbDownAlt color="#03acc8" />}
        {...styles}
      />
    );
  }
};

const Notes = ({
  cardId,
  notes,
  // handleCommentsUpdate,
  // setCards,
}) => {
  const [revNotes, setRevNotes] = useState(notes.map((c) => c).reverse());
  const [newNote, setNewNote] = useState("");

  useEffect(() => {
    setRevNotes(notes.map((c) => c).reverse());
  }, [notes]);

  // const handleSaveEdit = async () => {
  //   const updatedCard = await updateCardById(cardId, { comments }, true);
  //   setCards((cards) => {
  //     return cards.map((card) => {
  //       if (cardId === card._id) {
  //         return updatedCard;
  //       } else {
  //         return card;
  //       }
  //     });
  //   });
  //   setIsEditing(false);
  // };

  return (
    <SimpleGrid rows={2} h="80vh" w="35%" p="5% 5% 5% 2%">
      <VStack alignItems="left" overflow="scroll">
        <Heading size="lg" mt={3} mb={2}>
          Notes
        </Heading>

        <AddNewNote newNote={newNote} setNewNote={setNewNote} />

        {revNotes.map((note, index) => {
          return (
            <Note key={index} cardId={cardId} currNoteIdx={index} note={note} />
          );
        })}
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
