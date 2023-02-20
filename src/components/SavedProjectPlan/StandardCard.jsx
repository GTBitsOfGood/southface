import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
} from "@chakra-ui/react";

import Image from "next/image";

const StandardCard = ({ title, imageUrl, criteria }) => {
  const [firstImage, secondImage] = imageUrl;

  const ChakraNextImage = ({ src, alt, ...rest }) => (
    <Box position="relative" {...rest}>
      <Image layout="fill" src={src} alt={alt} />
    </Box>
  );

  return (
    <Card boxShadow="none" flex="1">
      <CardHeader>
        <Heading size="lg">{title}</Heading>
      </CardHeader>
      <CardBody marginLeft="3" marginRight="3">
        <Flex gap={2}>
          <ChakraNextImage
            src={firstImage}
            alt="Shopping Cart Image"
            height="5rem"
            width="5rem"
          />
          <ChakraNextImage
            src={secondImage}
            alt="Shopping Cart Image"
            height="5rem"
            width="5rem"
          />
        </Flex>
        <Box>{criteria}</Box>
      </CardBody>
    </Card>
  );
};

export default StandardCard;
