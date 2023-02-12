import { Center, Flex } from "@chakra-ui/layout";

const WrapperBox = ({ children }) => {
  return (
    <Flex width="100%" height="75%" align="center" justify="center">
      <Center
        rounded="md"
        boxShadow="dark-lg"
        height={{ base: "30em", xl: "30em", "2xl": "33em" }}
        width={{ base: "30em", xl: "30em", "2xl": "33em" }}
      >
        {children}
      </Center>
    </Flex>
  );
};

export default WrapperBox;
