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
import CardModal from "../CardModal";

const StandardCard = ({title, image, bodyText}) => {

  const { isOpen, onOpen, onClose } = useDisclosure();

  const samplePictureUrl = "https://picsum.photos/200";

  const sampleText =
    "The cardboard/foam covers over the registers are good, but a solid material would be beƩer. Siding or plywood scraps will hold up to people standing on them or placing objects on them. Also, not pictured, cover bath fans prior to the installation of drywall and painting to prevent drywall dust and paint from contaminating the fans.";

  return (
    <Flex flexDirection="column" boxShadow="base" width="xs" height="lg">
      <Image
        height="37%"
        width="full"
        fit="cover"
        src={samplePictureUrl}
        alt="construction image"
      />
      <Flex p={3} flexDirection="column" flex={1}>
        <Heading size="md">Title</Heading>
        <Text fontSize="sm" lineHeight="shorter" py={2}>
          {sampleText}
        </Text>
        <HStack>
          {new Array(3).fill("Tag").map((tag, index) => {
            return <Tag key={index}>{tag}</Tag>;
          })}
        </HStack>
        <Button size="lg" mt={7} onClick={onOpen} >
          View Full Standard
        </Button>
        <CardModal isOpen={isOpen} onClose={onClose} headerValue={title}/>
      </Flex>
    </Flex>
  );
};

export default StandardCard;
