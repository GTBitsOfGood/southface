import React from "react";
import {
  Button,
  Image,
  Flex,
  Box,
  Heading,
  Text,
  HStack,
  Tag,
} from "@chakra-ui/react";

const StandardCard = ({ cardId, isLoggedIn, isAdmin }: StandardCardProps) => {
  const samplePictureUrl = "https://picsum.photos/200";

  const sampleText =
    "The cardboard/foam covers over the registers are good, but a solid material would be beƩer. Siding or plywood scraps will hold up to people standing on them or placing objects on them. Also, not pictured, cover bath fans prior to the installation of drywall and painting to prevent drywall dust and paint from contaminating the fans.";

  const handleDelete = () => {
    alert("Delete card");
  };

  return (
    <Flex flexDirection="column" boxShadow="base" width="xs" height="lg">
      <Box height="37%" width="full" position="relative">
        <Image
          width="full"
          height="full"
          fit="cover"
          src={samplePictureUrl}
          alt="construction image"
        />
        {isLoggedIn && isAdmin ? (
          <Button
            onClick={handleDelete}
            bottom="70%"
            left="70%"
            position="absolute"
            w="80px"
            h="40px"
          >
            Delete
          </Button>
        ) : (
          <></>
        )}
      </Box>
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
        <Button size="lg" mt={7}>
          View Full Standard
        </Button>
      </Flex>
    </Flex>
  );
};

interface StandardCardProps {
  cardId: number;
  isLoggedIn: boolean;
  isAdmin: boolean;
}

export default StandardCard;
