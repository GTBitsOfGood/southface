import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Image,
  Tag,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import CardModal from "../Modals/CardModal";
import ImagePreviewModal from "../Modals/ImagePreviewModal";
import {
  addToActivePlan,
  /* changeInActivePlan, */ removeFromActivePlan,
} from "../../actions/User";
import useActivePlan from "../../lib/hooks/useAcivePlan";

const StandardCard = ({ card, setCards, ...props }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenImagePreviewModal,
    onOpen: onOpenImagePreviewModal,
    onClose: onCloseImagePreviewModal,
  } = useDisclosure();

  const { renderType = "default" } = { ...props }; // sets what kind of standardCard to show
  const { plan, mutatePlan, isValidating } = useActivePlan();
  useEffect(() => {
    if (!isValidating) {
      setSelected(plan.cards.map((card) => card._id).indexOf(card._id) >= 0);
    }
  }, [plan, isValidating, card._id]);
  const addHandler = async () => {
    if (selected) {
      await removeFromActivePlan(card);
    } else {
      await addToActivePlan(card);
    }
    mutatePlan();
  };

  const [selected, setSelected] = useState(false);

  const SelectorButton = () => (
    <Button onClick={addHandler}>
      {selected ? "Remove from plan" : "Add to Plan"}
    </Button>
  );

  return (
    <Flex
      {...props}
      flexDirection="column"
      boxShadow="base"
      bgColor="white"
      height={{ base: "sm", md: "md" }}
    >
      {renderType}
      <Box height="37%" position="relative">
        {/* {card.selected && mode !== "red" && (
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
        )} */}
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
        <Heading my={2} size="md">
          {card.title}
        </Heading>

        <HStack>
          {card.tags.map((tag, index) => {
            return (
              <Tag key={index} bgColor="#D9D9D9">
                {tag}
              </Tag>
            );
          })}
        </HStack>
        <SelectorButton />
        <Button size="lg" mt={7} onClick={onOpen} bgColor="#D9D9D9">
          View Full Standard
        </Button>
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
          selected={selected}
        />
      </Flex>
    </Flex>
  );
};

export default StandardCard;
