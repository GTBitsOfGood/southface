import {
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
  let selected = !selState ? false : true;
  // const imgArr = selected ?
  const { addToReport, removeFromReport } = useActiveReport();
  const reportAddHandler = (e) => {
    e.stopPropagation(); // stops modal from opening
    if (!selected) {
      addToReport(card);
    } else {
      removeFromReport(card);
    }
  };

  return (
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
      w="280px"
      transition="0.1s ease-in-out"
      mb={3}
    >
      <Image
        objectFit="cover"
        src={card.images[0].imageUrl}
        alt="construction image"
        boxSize="5em"
        w="100%"
      />

      <Flex height="50%" p={3} flexDirection="column" flexShrink={1} mx="2">
        <Heading fontSize="xs" isTruncated flexShrink={1}>
          {card.title}
        </Heading>

        <Text
          fontSize="2xs"
          lineHeight="1.2em"
          maxHeight="4em"
          noOfLines="3"
          flexShrink={1}
        >
          {card.criteria}
        </Text>

        <HStack
          mb="0.5"
          display="flex"
          mt="1"
          justifyContent="space-between"
          width="100%"
          alignContent="center"
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
          {/* <ReportButton /> */}
          {user?.isLoggedIn && (
            <Button
              variant={selected ? "Grey" : "Blue-outlined"}
              onClick={reportAddHandler}
              flexGrow={0}
              flexShrink={0}
              {...props}
              fontSize="3xs"
              size="sm"
              isDisabled={user?.isLoggedIn ? false : true}
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
  );
};

export default StandardCard;
