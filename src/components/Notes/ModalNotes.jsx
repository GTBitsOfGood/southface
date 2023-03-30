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
import urls from "lib/utils/urls";
import React, { useEffect, useState } from "react";
import useSWR, { mutate } from "swr";
import { thumbsDown, thumbsUp, thumbsUpAndDown } from "../../actions/Card";
import useUser from "../../lib/hooks/useUser";
import AddNewNote from "./AddNewNote";
import Note from "./Note";
import SentimentButton from "./SentimentButton";
import InformationPreview from "./InformationPreview";

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
  currentImage,
  cardId,
}) {
  const { user } = useUser();
  const { data } = useSWR(urls.api.card.get + cardId);
  const [card, setCard] = useState();

  const [liked, setLiked] = useState();
  const [disliked, setDisliked] = useState();

  useEffect(() => {
    setCard(data?.payload);
  }, [data]);

  useEffect(() => {
    setLiked(() => {
      return user?.isLoggedIn
        ? card?.images[currentImage].thumbsUp.includes(user.id)
        : false;
    });
    setDisliked(() => {
      return user?.isLoggedIn
        ? card?.images[currentImage].thumbsDown.includes(user.id)
        : false;
    });
  }, [user, currentImage, card]);

  const [preview, setPreview] = useState(false);

  const handleLikeClick = async () => {
    if (disliked && !liked) {
      // disliked image previously and about to like
      await thumbsUpAndDown(cardId, user.id, currentImage, false);
    } else {
      if (liked) {
        // unlike the image
        await thumbsUp(cardId, user.id, currentImage, false);
      } else {
        // like image
        await thumbsUp(cardId, user.id, currentImage, true);
      }
    }
    mutate(urls.api.card.get + cardId);
  };

  const handleDislikeClick = async () => {
    if (liked && !disliked) {
      // liked image previous and about to dislike
      await thumbsUpAndDown(cardId, user.id, currentImage, true);
    } else {
      if (disliked) {
        await thumbsDown(cardId, user.id, currentImage, false);
      } else {
        await thumbsDown(cardId, user.id, currentImage, true);
      }
    }
    mutate(urls.api.card.get + cardId);
  };

  const handlePreviewClick = () => {
    setPreview(!preview);
  };

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
        {selState && (
          <Button variant="Blue-rounded" onClick={editHandler}>
            {editing ? "Save Changes" : "Add notes"}
          </Button>
        )}
      </VStack>

      {preview ? (
        <InformationPreview
          onClick={handlePreviewClick}
          images={card?.images}
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
              {selState && (
                <Button variant="Blue-rounded" onClick={editHandler}>
                  {editing ? "Save Changes" : "Add notes"}
                </Button>
              )}
            </HStack>
          </VStack>
        </Flex>
      )}
    </VStack>
  );
}
