import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  useBreakpointValue,
} from "@chakra-ui/react";
import Image from "next/image";

const StandardCard = ({ title, imageUrl, criteria }) => {
  const [firstImage, secondImage] = imageUrl;

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
          <ChakraNextImage
            src={firstImage}
            alt="Shopping Cart Image"
            height={imageSize}
            width={imageSize}
          />
          <ChakraNextImage
            src={secondImage}
            alt="Shopping Cart Image"
            height={imageSize}
            width={imageSize}
          />
        </Flex>
        <Box>{criteria}</Box>
      </CardBody>
    </Card>
  );
};

export default StandardCard;
