import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import Image from "next/image";

const StandardCard = ({ title, images, criteria }) => {
  const ChakraNextImage = ({ src, alt, ...rest }) => (
    <Box position="relative" {...rest}>
      <Image layout="fill" src={src} alt={alt} />
    </Box>
  );

  const imageSize = useBreakpointValue({ base: "8rem", "2xl": "10rem" });

  return (
    <Card boxShadow="none" flex="1">
      <CardHeader>
        <Heading size="lg">{title}</Heading>
      </CardHeader>
      <CardBody marginLeft="3" marginRight="3">
        <Flex gap={2} position="relative">
          {images.slice(0, 2).map(({ imageUrl: image }, index) => (
            <ChakraNextImage
              src={image}
              alt="Shopping Cart Image"
              height={imageSize}
              width={imageSize}
              key={index}
            />
          ))}
        </Flex>
        <Text mt="2">{criteria}</Text>
      </CardBody>
    </Card>
  );
};

export default StandardCard;
