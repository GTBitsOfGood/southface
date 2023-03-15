import { AddIcon, CloseIcon, InfoOutlineIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Circle,
  Flex,
  Heading,
  HStack,
  IconButton,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

import { updateCardById } from "../../actions/Card";
import useActiveReport from "../../lib/hooks/useActiveReport";
import useUser from "../../lib/hooks/useUser";
import AddNewNote from "./AddNewNote";
import InformationPreview from "./InformationPreview";
import Note from "./Note";
import SentimentButton from "./SentimentButton";

const Notes = ({
  cardId,
  notes,
  setCards,
  cardImages,
  currentImage,
  ...rest
}) => {
  const [currentNotes, setCurrentNotes] = useState(
    notes.map((n) => n).reverse()
  );
  const [newNote, setNewNote] = useState({ body: "", userId: "", date: "" });

  const { user } = useUser();

  const [liked, setLiked] = useState();
  const [disliked, setDisliked] = useState();
  useEffect(() => {
    setLiked(() => {
      return cardImages[currentImage]?.thumbsUp.includes(user.id);
    });
    setDisliked(() => {
      return cardImages[currentImage]?.thumbsDown.includes(user.id);
    });
  }, [currentImage]);

  const [preview, setPreview] = useState(false);

  const handleLikeClick = () => {
    if (disliked && !liked) {
      setDisliked(!disliked);
      setLiked(!liked);
    } else {
      setLiked(!liked);
    }
  };

  const handleDislikeClick = () => {
    if (liked && !disliked) {
      setLiked(!liked);
      setDisliked(!disliked);
    } else {
      setDisliked(!disliked);
    }
  };

  const handlePreviewClick = () => {
    setPreview(!preview);
  };

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
  const { editing, setEditing } = { ...rest };
  const editHandler = () => {
    if (!selState) {
      setEditing(false);
    } else {
      setEditing((prev) => !prev);
    }
  };

  const noteToggleHandler = (index) => () => {
    if (selState && editing) {
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
    <VStack
      h="100%"
      w="35%"
      p="5% 2% 2% 2%"
      alignItems="left"
      justifyContent="space-between"
    >
      <VStack
        alignItems="left"
        w="100%"
        pb={10}
        maxH={{ xl: "82%", "2xl": "85%" }}
      >
        <Heading size="lg" mt={3} mb={2}>
          Notes
        </Heading>

        <Box h="50vh" overflowY="auto">
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
        {selState && (
          <Button variant="Blue-rounded" onClick={editHandler}>
            {editing ? "Save Changes" : "Add notes"}
          </Button>
        )}
      </VStack>

      {preview ? (
        <InformationPreview
          onClick={handlePreviewClick}
          images={cardImages}
          currentImage={currentImage}
        />
      ) : (
        <Flex alignItems="end">
          <VStack alignItems="left" w="80%">
            <HStack>
              <Text fontSize="sm">Was this image helpful?</Text>
              {user?.isAdmin ? (
                <IconButton
                  bg="none"
                  _hover={{ bg: "none" }}
                  icon={<InfoOutlineIcon color="Grey" />}
                  onClick={handlePreviewClick}
                />
              ) : (
                <></>
              )}
            </HStack>
            <HStack justify="space-between">
              <HStack>
                <SentimentButton
                  type="like"
                  status={liked}
                  onClick={handleLikeClick}
                />
                <SentimentButton
                  type="dislike"
                  status={disliked}
                  onClick={handleDislikeClick}
                />
              </HStack>
            </HStack>
          </VStack>
        </Flex>
      )}
    </VStack>
  );
};

export default Notes;
