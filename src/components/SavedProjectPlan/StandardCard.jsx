import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  Image,
} from "@chakra-ui/react";

const StandardCard = ({ title, imageUrl, criteria }) => {
  const [firstImage, secondImage] = imageUrl;

  return (
    <Card flex="1">
      <CardHeader>
        <Heading size="lg">{title}</Heading>
      </CardHeader>
      <CardBody marginLeft="3" marginRight="3">
        <Flex>
          <Box flex="1">
            <Image
              src={firstImage}
              fallbackSrc="https://user-images.githubusercontent.com/69729390/214123449-126291c9-2cde-4773-90b7-a54a38336553.png"
              alt="Shopping Cart Image"
            />
          </Box>
          <Box flex="1">
            <Image
              src={secondImage}
              fallbackSrc="https://user-images.githubusercontent.com/69729390/214123449-126291c9-2cde-4773-90b7-a54a38336553.png"
              alt="Shopping Cart Image"
            />
          </Box>
        </Flex>
        <Box>{criteria}</Box>
      </CardBody>
    </Card>
  );
};

export default StandardCard;
