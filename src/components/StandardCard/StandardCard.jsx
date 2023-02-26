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
import React, { useEffect, useState } from "react";
import urls from "src/lib/utils/urls";
import useSWRMutation from "swr/mutation";
import { updateRecentStandardsRequest } from "../../actions/User";
import useUser from "../../lib/hooks/useUser";
import CardModal from "../Modals/CardModal";

const StandardCard = ({ card, setCards, ...props }) => {
  const { user } = useUser();
  const {
    isOpen: isOpenCardModal,
    onOpen: onOpenCardModal,
    onClose: onCloseCardModal,
  } = useDisclosure();
  const { trigger, data, isMutating } = useSWRMutation(
    urls.api.user.standards.update,
    (route, { arg }) => {
      return updateRecentStandardsRequest(arg.userId, arg.cardId);
    }
  );
  const [updateRecentStandardsTriggered, setUpdateRecentStandardsTriggered] =
    useState(false);

  useEffect(() => {
    if (
      isOpenCardModal &&
      user.id &&
      !isMutating &&
      !updateRecentStandardsTriggered
    ) {
      trigger({ userId: user.id, cardId: card._id });
    } else if (!isOpenCardModal && updateRecentStandardsTriggered) {
      setUpdateRecentStandardsTriggered(false);
    }
  }, [
    isOpenCardModal,
    card,
    user,
    trigger,
    isMutating,
    updateRecentStandardsTriggered,
  ]);

  useEffect(() => {
    if (data) {
      setUpdateRecentStandardsTriggered(true);
    }
  }, [data]);

  return (
    <Flex
      {...props}
      flexDirection="column"
      boxShadow="base"
      rounded="23.3173px"
      overflow="hidden"
      height="19rem"
      width="24rem"
      onClick={onOpenCardModal}
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
          src={card.images[0].imageUrl}
          alt="construction image"
        />
        {/* <StandardCardImageCarousel cardImages={card.images} /> */}
      </Box>

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
            variant="blue-outlined"
          >
            Add To Report
          </Button>
        </HStack>
        <CardModal
          isOpenCardModal={isOpenCardModal}
          onCloseCardModal={onCloseCardModal}
          card={card}
          setCards={setCards}
        />
      </Flex>
    </Flex>
  );
};

export default StandardCard;
