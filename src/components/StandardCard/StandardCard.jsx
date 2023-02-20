import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Image,
  Tag,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import CardModal from "../Modals/CardModal";
import ImagePreviewModal from "../Modals/ImagePreviewModal";

const StandardCard = ({ card, setCards, ...props }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenImagePreviewModal,
    onOpen: onOpenImagePreviewModal,
    onClose: onCloseImagePreviewModal,
  } = useDisclosure();

  return (
    <Flex
      {...props}
      flexDirection="column"
      boxShadow="base"
      bgColor="white"
      rounded="23.3173px"
      overflow="hidden"
      height="19rem"
      width="24rem"
      onClick={onOpen}
      _hover={{
        cursor: "pointer",
        transition: "0.1s ease-in-out",
        boxShadow: "xl",
      }}
      transition="0.1s ease-in-out"
    >
      <Box height="47%" position="relative">
        <Image
          height="100%"
          width="full"
          fit="cover"
          src={card.images[0]}
          alt="construction image"
          onClick={onOpenImagePreviewModal}
        />
      </Box>

      <ImagePreviewModal
        isOpen={isOpenImagePreviewModal}
        onClose={onCloseImagePreviewModal}
        cardImages={card.images}
        cardComments={card.comments}
      />

      <Flex p={3} flexDirection="column" flex={1} mx="2">
        <Heading size="md">{card.title}</Heading>

        <Text fontSize="sm" lineHeight="1.2rem" maxHeight="5rem" noOfLines="3">
          {card.criteria}
        </Text>

        <HStack mt="auto" position="relative" mb="0.5">
          {card.tags.slice(0, 3).map((tag, index) => {
            return (
              <Tag key={index} bgColor="#C4D600" rounded="14.7877px" px="2">
                {tag}
              </Tag>
            );
          })}
          <Button
            position="absolute"
            right="1"
            bottom="0"
            size="sm"
            p="2"
            variant="outline"
            color="#00ACC8"
            border="1px solid #00ACC8"
          >
            Add To Plan
          </Button>
        </HStack>
        <CardModal
          isOpen={isOpen}
          onClose={onClose}
          isEditingFirst={false}
          cardId={card._id}
          cardTags={card.tags}
          cardTitle={card.title}
          cardCriteria={card.criteria}
          cardImages={card.images}
          setCards={setCards}
        />
      </Flex>
    </Flex>
  );
};

export default StandardCard;
