import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  HStack,
  Image,
  VStack,
  Text,
  Flex,
  Spacer,
  Box,
} from "@chakra-ui/react";

import { ChevronRightIcon, ChevronLeftIcon } from "@chakra-ui/icons";
import { useEffect } from "react";

const ImagePreviewModal = ({ isOpen, onClose, cardImages, cardComments }) => {
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);
  const [showBackArrow, setShowBackArrow] = React.useState(false);
  const [showNextArrow, setShowNextArrow] = React.useState(false);

  useEffect(() => {
    if (cardImages.length <= 1) {
      setShowNextArrow(false);
    } else {
      setShowNextArrow(true);
    }
  }, []);

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
                src={cardImages[currentImageIndex]}
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
              <VStack p="2% 5% 2% 2%" alignItems="flex-start" w="35%">
                {cardComments.map((comment, index) => {
                  return (
                    <Box key={index}>
                      <Text>{comment.body}</Text>

                      <Flex w="full" justifyContent="space-between">
                        <Text color="#FFD600">
                          {new Date(comment.date).toDateString()}
                        </Text>
                        <Text color="#0065C1"></Text>
                      </Flex>
                      <Spacer />
                    </Box>
                  );
                })}
              </VStack>
            </HStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ImagePreviewModal;
