import { Flex, Text } from "@chakra-ui/react"; // Don't forget to import 'Text'
import React from "react";
import Image from "src/components/Image";

const MobileNavBar = () => {
  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="center"
      width="100%"
    >
      <Image
        src="/static/EarthcraftLogo.png"
        alt="Earthcraft-Logo"
        height="6em"
        width="14em"
        mr={5}
      />
      <Text>Logged in as John</Text>
    </Flex>
  );
};

export default MobileNavBar;
