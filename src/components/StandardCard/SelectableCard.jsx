import {
  Button,
  Flex,
  Heading,
  HStack,
  Image,
  Stack,
  Tag,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import CardModal from "../Modals/CardModal";

const SelectableCard = ({ selected, setSelect, cardProps }) => {
  const samplePictureUrl =
    "https://img.freepik.com/free-vector/oops-404-error-with-broken-robot-concept-illustration_114360-1932.jpg?w=2000";
  const { title, body, tags, images } = cardProps;
  const { isOpen, onOpen, onClose } = useDisclosure();

  const sampleText =
    "The cardboard/foam covers over the registers are good, but a solid material would be beƩer. Siding or plywood scraps will hold up to people standing on them or placing objects on them. Also, not pictured, cover bath fans prior to the installation of drywall and painting to prevent drywall dust and paint from contaminating the fans.";
  return (
    <Flex flexDirection="column" boxShadow="base" width="xs" height="xl">
      <Image
        height="37%"
        width="full"
        fit="cover"
        src={images ? images[0] : samplePictureUrl}
        alt="construction image"
      />
      <Flex p={3} bg="white" flexDirection="column" flex={1}>
        <Heading size="md">{title ? title : "(no title)"}</Heading>
        <Text fontSize="sm" lineHeight="shorter" py={2}>
          {body ? body : sampleText}
        </Text>
        <HStack>
          {tags &&
            tags.map((tag, index) => {
              return <Tag key={index}>{tag}</Tag>;
            })}
        </HStack>
        <Stack>
          <Button size="lg" mt={7} onClick={onOpen}>
            View Full Standard
          </Button>
          <Button
            bgColor={selected ? "green" : "lightgray"}
            onClick={() => setSelect(!selected)}
          >
            {selected ? "[x] Deselect" : "[ ] Select"}
          </Button>
        </Stack>
      </Flex>
      <CardModal
        isOpen={isOpen}
        onClose={onClose}
        isEditingFirst={false}
        cardId={cardProps._id}
        cardTags={tags}
        cardTitle={title}
        cardBody={body}
        cardImages={images}
      />
    </Flex>
  );
};

export default SelectableCard;
