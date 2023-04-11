import { Flex, Image } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Flex
      borderTop="1px solid"
      borderColor="gray.300"
      height="10vh"
      width="100%"
      justifyContent="center"
      gap="10px"
      backgroundColor="white"
    >
      <Image
        src="/static/Southface.png"
        mt="-10px"
        boxSize="6em"
        objectFit="contain"
        alt="footer"
      />
      <Image
        src="/static/bog.png"
        mt="-7px"
        boxSize="6em"
        objectFit="contain"
        alt="footer"
      />
      <Image
        src="/static/netlify.png"
        mt="5px"
        boxSize="4em"
        objectFit="contain"
        alt="footer"
      />
    </Flex>
  );
};

export default Footer;
