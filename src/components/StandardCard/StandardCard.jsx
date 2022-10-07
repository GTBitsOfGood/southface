import React from "react";
import {
  Button,
  Image,
  Flex,
  Heading,
  Text,
  HStack,
  Tag,
  useDisclosure,
} from "@chakra-ui/react";
import CardModal from "../Modals/CardModal";

const StandardCard = ({ card }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex flexDirection="column" boxShadow="base" width="xs" height="lg">
      {
        <Image
          height="37%"
          width="full"
          fit="cover"
          src={card.images[0]}
          alt="construction image"
        />
      }

      <Flex p={3} flexDirection="column" flex={1}>
        <Heading size="md">{card.title}</Heading>
        <Text fontSize="sm" lineHeight="shorter" py={2}>
          {card.body}
        </Text>
        <HStack>
          {card.tags.map((tag, index) => {
            return <Tag key={index}>{tag}</Tag>;
          })}
        </HStack>
        <Button size="lg" mt={7} onClick={onOpen}>
          View Full Standard
        </Button>
        <CardModal
          isOpen={isOpen}
          onClose={onClose}
          isEditingFirst={false}
          cardId={card._id}
          cardTags={card.tags}
          cardTitle={card.title}
          cardBody={card.body}
          cardImages={card.images}
        />
      </Flex>
    </Flex>
  );
};

export default StandardCard;
