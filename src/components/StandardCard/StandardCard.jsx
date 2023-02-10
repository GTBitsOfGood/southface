import { CheckIcon, CloseIcon, InfoIcon, RepeatIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Icon,
  IconButton,
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

  const {
    setSelection = () => undefined,
    mode = "green",
    selectable = false,
  } = { ...card };
  const modeColors = {
    green: "green.500",
    red: "red.500",
    switchGray: "gray.500",
    switchYellow: "yellow.500",
  };
  const modeIcons = {
    green: CheckIcon,
    red: CloseIcon,
    switchGray: RepeatIcon,
    switchYellow: RepeatIcon,
  };
  const SelectorButton = () => (
    <Button
      isDisabled={mode === "switchYellow" || mode === "switchGray"}
      onClick={() => setSelection(!card.selected)}
      flex="1"
    >
      {card.selected ? "Remove from plan" : "Add to Plan"}
    </Button>
  );

  return (
    <Flex
      {...props}
      flexDirection="column"
      boxShadow="base"
      bgColor="white"
      height={{ base: "sm", md: "md" }}
      borderColor={
        mode === "switchYellow" ? modeColors.switchYellow : "green.500"
      }
      borderWidth={
        card.selected && (mode === "green" || mode === "switchYellow")
          ? "5px"
          : "0"
      }
      onClick={
        mode === "switchYellow" || mode === "switchGray"
          ? () => setSelection(!card.selected)
          : () => undefined
      }
    >
      <Box height="37%" position="relative">
        {card.selected && mode !== "red" && (
          <Icon
            bgColor={modeColors[mode]}
            color="white"
            borderRadius="100%"
            p="1"
            as={modeIcons[mode]}
            position="absolute"
            fontSize="24"
            left="5"
            top="5"
          />
        )}
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

      <Flex p={3} flexDirection="column" flex={1}>
        <Heading my={2} size="md">{card.title}</Heading>

        <HStack>
          {card.tags.map((tag, index) => {
            return (
              <Tag key={index} bgColor="#D9D9D9">
                {tag}
              </Tag>
            );
          })}
        </HStack>
        {/* For now the selectable button is disabled due to bugs */}
        {selectable ? (
          <HStack justify="space-evenly" pt="5">
            <SelectorButton />
            <IconButton
              onClick={onOpen}
              fontSize="lg"
              isDisabled
              icon={<Icon as={InfoIcon} />}
            ></IconButton>
          </HStack>
        ) : (
          <Button size="lg" mt={7} onClick={onOpen} bgColor="#D9D9D9">
            View Full Standard
          </Button>
        )}

        <Text mt={4}>{card.criteria}</Text>
        <CardModal
          isOpen={isOpen}
          onClose={onClose}
          isEditingFirst={false}
          cardId={card._id}
          cardTags={card.tags}
          cardTitle={card.title}
          cardCriteria={card.criteria}
          cardImages={card.images}
          AddToPlanButton={<SelectorButton />}
          setCards={setCards}
        />
      </Flex>
    </Flex>
  );
};

export default StandardCard;
