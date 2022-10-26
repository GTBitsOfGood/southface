import React from "react";
import {
  Button,
  Image,
  Flex,
  Heading,
  HStack,
  Tag,
  useDisclosure,
} from "@chakra-ui/react";
import CardModal from "../Modals/CardModal";
import Comments from "../Comments";

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
