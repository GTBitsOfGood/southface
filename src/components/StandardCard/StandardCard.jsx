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
  const [addToReportButtonPressed, setAddToReportButtonPressed] =
    useState(false);

  useEffect(() => {
    if (
      (isOpenCardModal || addToReportButtonPressed) &&
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
    addToReportButtonPressed,
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
    setAddToReportButtonPressed(true);
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
      whiteSpace="nowrap"
      {...props}
      w="35%"
      isDisabled={user?.isLoggedIn ? false : true}
    >
      {!selected ? "Add To Report" : "Added to Report"}
    </Button>
  );

  return (
    <Box {...props}>
      <Flex
        flexDirection="column"
        boxShadow="base"
        rounded="23.3173px"
        overflow="hidden"
        onClick={onOpenCardModal}
        _hover={{
          cursor: "pointer",
          transition: "0.1s ease-in-out",
          boxShadow: "xl",
        }}
        minWidth="24em"
        maxHeight="20em"
        width="auto"
        height="100%"
        transition="0.1s ease-in-out"
      >
        <Box height="35%" flexShrink={1}>
          <Image
            fit="cover"
            src={card.images[0].imageUrl}
            alt="construction image"
            height="100%"
            width="100%"
          />
        </Box>

        <Flex height="60%" p={3} flexDirection="column" flexShrink={1} mx="2">
          <Heading
            isTruncated
            flexShrink={1}
            fontFamily="Roboto Slab"
            fontSize="25px"
            fontWeight="700"
          >
            {card.title}
          </Heading>

          <Text
            fontSize="90%"
            lineHeight="1.2em"
            maxHeight="5em"
            noOfLines="4"
            flexShrink={1}
            textStyle="secondaryTextStandard"
            paddingBottom="2rem"
          >
            {card.criteria}
          </Text>

          <HStack
            mt="auto"
            mb="0.5"
            display="flex"
            justifyContent="space-between"
            height="5%"
            width="100%"
          >
            <Flex overflowY="auto" flexShrink={0} width="65%">
              {card.tags.map((tag, index) => {
                if (index < 3) {
                  return (
                    <Tag
                      key={index}
                      textTransform="capitalize"
                      bgColor="#E2E3E5"
                      rounded="14.7877px"
                      marginLeft={0.5}
                      minWidth="max-content"
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
    </Box>
  );
};

export default StandardCard;
