import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  Image,
} from "@chakra-ui/react";
const StandardCard = () => {
  return (
    <Card flex="1">
      <CardHeader>
        <Heading size="lg">Standard 1</Heading>
      </CardHeader>
      <CardBody marginLeft="3" marginRight="3">
        <Flex>
          <Box flex="1">
            <Image
              src="/static/ShoppingCartImg.png"
              fallbackSrc="https://user-images.githubusercontent.com/69729390/214123449-126291c9-2cde-4773-90b7-a54a38336553.png"
              alt="Shopping Cart Image"
            />
          </Box>
          <Box flex="1">
            <Image
              src="/static/ShoppingCartImg.png"
              fallbackSrc="https://user-images.githubusercontent.com/69729390/214123449-126291c9-2cde-4773-90b7-a54a38336553.png"
              alt="Shopping Cart Image"
            />
          </Box>
        </Flex>
        <Box>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </Box>
      </CardBody>
    </Card>
  );
};

export default StandardCard;
