import {
    Box,
    Button,
    Flex,
    HStack,
    Heading,
    Image,
    Popover,
    PopoverBody,
    PopoverContent,
    PopoverTrigger,
    Portal,
    Tag,
    TagLabel,
    Text,
    VStack,
    useDisclosure
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import urls from "src/lib/utils/urls";
import useSWRMutation from "swr/mutation";
import { updateRecentStandardsRequest } from "../../actions/User";
import useActiveReport from "../../lib/hooks/useActiveReport";
import useUser from "../../lib/hooks/useUser";
import CardModalWithForm from "../Modals/CardModal";

const StandardCard = ({ card, cards, setCards, filteredTags, ...props }) => {
  const { user } = useUser();
  const {
    isOpen: isOpenCardModal,
    onOpen: onOpenCardModal,
    onClose: onCloseCardModal,
  } = useDisclosure();
  const {
    isOpen: isOpenTagModal,
    onOpen: onOpenTagModal,
    onClose: onCloseTagModal,
  } = useDisclosure();
  const { trigger, data, isMutating } = useSWRMutation(
    urls.api.user.standards.update,
    (route, { arg }) => {
      return updateRecentStandardsRequest(arg.userId, arg.cardId);
    }
  );
  const [updateRecentStandardsTriggered, setUpdateRecentStandardsTriggered] =
    useState(false);
  const [addToReportButtonPressed] = useState(false);

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
  const { addToReport, removeFromReport } = useActiveReport();

  const reportAddHandler = (e) => {
    // We don't need this anymore since we don't want to ever
    // completely disable the button
    //setAddToReportButtonPressed(true);
    e.stopPropagation(); // stops modal from opening
    if (!selected) {
      addToReport(card);
    } else {
      removeFromReport(card);
    }
  };

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
        minWidth={{ base: "100%", md: "24em" }}
        maxHeight={{ base: "auto", md: "20em" }}
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
            width="100%"
            align="stretch"
          >
            <Flex overflowY="none" flexShrink={0} width="65%">
                {[...card.tags].sort((a, b) => {
                    if (filteredTags) {
                    if (filteredTags.includes(a) && filteredTags.includes(b)) {
                        return a.localeCompare(b)
                    } else if (filteredTags.includes(a)) {
                        return -1
                    } else if (filteredTags.includes(b)) {
                        return 1
                    }
                    }
                    return a.localeCompare(b)
                }).map((tag, index) => {
                if (index < 2 || (index == 2 && card.tags.length == 3)) {
                    return (
                    <Tag
                        key={index}
                        bgColor="#E2E3E5"
                        borderRadius="30px"
                        textTransform="capitalize"
                        fontSize="0.75rem"
                        px="0.75rem"
                        fontFamily="'Inter', sans-serif"
                        color="#515254"
                        marginRight="0.25rem"
                        width="fit-content"
                        >
                        <TagLabel 
                            textOverflow="ellipsis"
                            maxWidth="10ch"
                            minWidth="15px"
                            width="fit-content"
                        >{tag}</TagLabel>
                    </Tag>
                    );
                } else if (index == 2) {
                    return (
                        <Popover
                            key={index}
                            isOpen={isOpenTagModal}
                            onClose={onCloseTagModal}
                            placement="top"
                        >
                        <PopoverTrigger>
                            <Tag
                                key={index}
                                bgColor="#E2E3E5"
                                borderRadius="30px"
                                textTransform="capitalize"
                                fontSize="0.75rem"
                                px="0.25rem"
                                fontFamily="'Inter', sans-serif"
                                color="#515254"
                            >
                                <TagLabel 
                                    textOverflow="ellipsis"
                                    maxWidth="8ch"
                                    minWidth="15px"
                                    onClick={(e)=> {
                                        onOpenTagModal()
                                        e.stopPropagation()
                                    }}
                                >+{card.tags.length-2}</TagLabel>
                            </Tag>
                        </PopoverTrigger>
                        <Portal>
                            <PopoverContent
                                border="0px"
                                background="none"
                            >
                                <PopoverBody>
                                <VStack
                                    borderColor="#E2E3E5"
                                    borderWidth="2px"
                                    borderRadius="10px"
                                    background="#FFFFFF"
                                    padding="10px"
                                    alignItems="left"
                                    width="fit-content"
                                >
                                    {[...card.tags].sort((a, b) => {
                                        if (filteredTags) {
                                        if (filteredTags.includes(a) && filteredTags.includes(b)) {
                                            return a.localeCompare(b)
                                        } else if (filteredTags.includes(a)) {
                                            return -1
                                        } else if (filteredTags.includes(b)) {
                                            return 1
                                        }
                                        }
                                        return a.localeCompare(b)
                                    }).map((tag, index) => 
                                        <Tag
                                            key={index}
                                            bgColor="#E2E3E5"
                                            borderRadius="30px"
                                            textTransform="capitalize"
                                            fontSize="0.75rem"
                                            px="0.75rem"
                                            fontFamily="'Inter', sans-serif"
                                            color="#515254"
                                            margin="0.1rem"
                                            width="fit-content"
                                            >
                                            <TagLabel 
                                                width="fit-content"
                                            >{tag}</TagLabel>
                                        </Tag>
                                    )}
                                </VStack>
                                </PopoverBody>
                            </PopoverContent>
                        </Portal>
                        </Popover>
                    );
                } else {
                    return null;
                }
                })}
            </Flex>
            {user?.isLoggedIn && (
              <Button
                variant={selected ? "Grey" : "Blue-outlined"}
                onClick={reportAddHandler}
                flexGrow={0}
                flexShrink={0}
                whiteSpace="nowrap"
                // {...props}
                w="35%"
                fontWeight="500"
                fontFamily="'Inter', sans-serif"
              >
                {!selected ? "Add To Report" : "Del From Report"}
              </Button>
            )}
          </HStack>

          <CardModalWithForm
            isOpenCardModal={isOpenCardModal}
            onCloseCardModal={onCloseCardModal}
            card={card}
            cards={cards}
            filteredTags={filteredTags}
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
