import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import {
  Box,
  Divider,
  Flex,
  HStack,
  IconButton,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { FaRegThumbsDown, FaRegThumbsUp } from "react-icons/fa";
import { updateCardById } from "../../../actions/Card";

const ImagePreviewModal = ({
  isOpen,
  onClose,
  cardImages,
  cardComments,
  cardId,
  setCards
}) => {
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);
  const [showBackArrow, setShowBackArrow] = React.useState(false);
  const [showNextArrow, setShowNextArrow] = React.useState(false);
  const [selectedButton, setSelectedButton] = useState(null);

  const handleClick = async (button) => {
    try {
      let updatedCard;
      const imageId = cardImages[currentImageIndex]._id;

      if (selectedButton === button) {
        // unselect
        setSelectedButton(null);

        // if it was previously disliked and now un-disliked
        if (button === "down") {
          const currThumbsDownCounter =
            cardImages[currentImageIndex].thumbsDown;
          updatedCard = await updateCardById(cardId, {
            imageId,
            thumbsDown: currThumbsDownCounter - 1,
          });
        }
        // if it was previously liked and now unliked
        else if (button === "up") {
          const currThumbsUpCounter = cardImages[currentImageIndex].thumbsUp;
          updatedCard = await updateCardById(cardId, {
            imageId,
            thumbsUp: currThumbsUpCounter - 1,
          });
        }
      } else {
        setSelectedButton(button);
        const thumbsUp = button === "up" ? 1 : 0;
        const thumbsDown = button === "down" ? 1 : 0;
        // update card
        updatedCard = await updateCardById(cardId, {
          thumbsUp,
          thumbsDown,
          imageId,
        });
        console.log(
          `Updating card with thumbsUp=${thumbsUp}, thumbsDown=${thumbsDown}, imageId=${imageId}`
        );
      }

      console.log(updatedCard);

      // update the card in the cards list
        setCards((cards) =>
          cards.map((card) => (card._id === updatedCard._id ? updatedCard : card))
        );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (cardImages.length <= 1) {
      setShowNextArrow(false);
    } else {
      setShowNextArrow(true);
    }
  }, [cardImages.length]);

  function getNextImage() {
    const nextIndex = currentImageIndex + 1;
    setShowBackArrow(true);
    setCurrentImageIndex(nextIndex);
    if (nextIndex + 1 >= cardImages.length) {
      setShowNextArrow(false);
    }
  }

  function getPreviousImage() {
    const prevIndex = currentImageIndex - 1;
    setShowNextArrow(true);
    setCurrentImageIndex(prevIndex);
    if (prevIndex - 1 < 0) {
      setShowBackArrow(false);
    }
  }

  return (
    <>
      <Modal
        size={{ base: "sm", md: "2xl", lg: "4xl" }}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent rounded={0}>
          <ModalCloseButton
            right="96%"
            top="3%"
            outlineColor="white"
            color="white"
            zIndex={1}
            rounded={20}
            w={{ base: "5px", sm: "10px", md: "15px" }}
            h={{ base: "5px", sm: "10px", md: "15px" }}
          />
          <ModalBody p="0px">
            <HStack>
              <Image
                pos="relative"
                width="65%"
                fit="cover"
                src={cardImages[currentImageIndex].imageUrl}
                alt="construction image"
              />

              <ChevronLeftIcon
                hidden={!showBackArrow}
                color="white"
                pos="absolute"
                onClick={getPreviousImage}
                w={6}
                h={6}
              />
              <ChevronRightIcon
                hidden={!showNextArrow}
                left="60%"
                color="white"
                pos="absolute"
                onClick={getNextImage}
                w={6}
                h={6}
              />
              <VStack
                maxH={{ base: "240px", md: "430px", lg: "575px" }}
                overflow="scroll"
                p="5% 5% 5% 2%"
                alignItems="flex-start"
                w="35%"
              >
                {cardComments.map((comment, index) => {
                  return (
                    <Box w="full" key={index}>
                      <Text>{comment.body}</Text>

                      <Flex w="full" justifyContent="space-between">
                        <Text color="#FFD600">
                          {new Date(comment.date).toDateString()}
                        </Text>
                        <Text color="#0065C1">Edit</Text>
                      </Flex>
                    </Box>
                  );
                })}

                <Box>
                  <Divider />
                  <Text>Was this image helpful?</Text>
                  <IconButton
                    aria-label="Send email"
                    icon={<FaRegThumbsUp />}
                    style={{
                      backgroundColor:
                        selectedButton === "up" ? "lightblue" : "initial",
                    }}
                    onClick={() => handleClick("up")}
                  />
                  <IconButton
                    aria-label="Send email"
                    icon={<FaRegThumbsDown />}
                    style={{
                      backgroundColor:
                        selectedButton === "down" ? "lightblue" : "initial",
                    }}
                    onClick={() => handleClick("down")}
                  />
                </Box>
              </VStack>
            </HStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ImagePreviewModal;
