import React from "react";
import {
  Button,
  Image,
  Flex,
  Heading,
  HStack,
  Tag,
  useDisclosure,
  Icon,
  Box,
} from "@chakra-ui/react";
import CardModal from "../Modals/CardModal";
import Comments from "../Comments";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";

const StandardCard = ({ card, ...props }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { setSelection = () => undefined, toDeselect = false } = { ...card };
  return (
    <Flex
      {...props}
      flexDirection="column"
      boxShadow="base"
      bgColor="white"
      height={{ base: "sm", md: "md" }}
      borderColor="green.500"
      borderWidth={card.selected && !card.toDeselect ? "5px" : "0"}
      onClick={() => setSelection(!card.selected)}
    >
      <Box height="37%" position="relative">
        {card.selected &&
          (toDeselect ? (
            <Icon
              bgColor="red.500"
              color="white"
              borderRadius="100%"
              p="1"
              as={CloseIcon}
              position="absolute"
              fontSize="24"
              left="5"
              top="5"
            />
          ) : (
            <Icon
              bgColor="green.500"
              color="white"
              borderRadius="100%"
              p="1"
              as={CheckIcon}
              position="absolute"
              fontSize="24"
              left="5"
              top="5"
            />
          ))}
        <Image
          height="100%"
          width="full"
          fit="cover"
          src={card.images[0]}
          alt="construction image"
        />
      </Box>

      <Flex p={3} flexDirection="column" flex={1}>
        <Heading size="md">{card.title}</Heading>
        <Comments
          mt="2"
          mb="5"
          comments={card.comments}
          cardId={card._id}
          canEdit={false}
        />
        <HStack>
          {card.tags.map((tag, index) => {
            return (
              <Tag key={index} bgColor="#D9D9D9">
                {tag}
              </Tag>
            );
          })}
        </HStack>
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
          cardComments={card.comments}
          cardImages={card.images}
        />
      </Flex>
    </Flex>
  );
};

export default StandardCard;
