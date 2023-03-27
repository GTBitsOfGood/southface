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
import useActiveReport from "../../lib/hooks/useActiveReport";
import useUser from "../../lib/hooks/useUser";
import CardModalWithForm from "../Modals/CardModal";

const StandardCard = ({ card, cards, setCards, ...props }) => {
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
      user?.id &&
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

  // Active report code
  // get report state
  // if state is undefined, selected = false
  // conditionally render note, images selection UI
  // editEnable,
  // useEffect on editEnable: make API call after deselecting
  const { selState } = { ...props };
  const selected = !selState ? false : true;
  // const imgArr = selected ?
  const { addToReport } = useActiveReport();
  const reportAddHandler = (e) => {
    e.stopPropagation(); // stops modal from opening
    if (!selected) {
      addToReport(card);
    }
  };

  const ReportButton = ({ ...props }) => (
    <Button
      variant={selected ? "Grey" : "Blue-outlined"}
      onClick={reportAddHandler}
      flexGrow={0}
      flexShrink={0}
      {...props}
    >
      {!selected ? "Add To Report" : "Added to Report"}
    </Button>
  );

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
          width="100%"
          fit="cover"
          src={card.images[0].imageUrl}
          alt="construction image"
        />
      </Box>

      <Flex p={3} flexDirection="column" flex={1} mx="2">
        <Heading fontSize="1rem" isTruncated>
          {card.title}
        </Heading>

        <Text
          fontSize=".92rem"
          lineHeight="1.2rem"
          maxHeight="4rem"
          noOfLines="3"
        >
          {card.criteria}
        </Text>

        <HStack
          mt="auto"
          mb="0.5"
          display="flex"
          justifyContent="space-between"
        >
          <Flex overflowX="scroll" flex={1}>
            {card.tags.map((tag, index) => {
              if (index < 3) {
                return (
                  <Tag
                    key={index}
                    textTransform="capitalize"
                    bgolor="#C4D600"
                    rounded="14.7877px"
                    marginLeft={0.5}
                    flexShrink={0}
                    display="flex"
                  >
                    {tag}
                  </Tag>
                );
              } else {
                return null;
              }
            })}
          </Flex>

          <ReportButton />
        </HStack>

        <CardModalWithForm
          isOpenCardModal={isOpenCardModal}
          onCloseCardModal={onCloseCardModal}
          card={card}
          cards={cards}
          setCards={setCards}
          selected={selected}
          selState={selState}
        />
      </Flex>
    </Flex>
  );
};

export default StandardCard;
