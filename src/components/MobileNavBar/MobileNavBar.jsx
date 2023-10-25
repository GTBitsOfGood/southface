import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Flex, IconButton, Text } from "@chakra-ui/react"; // Don't forget to import 'Text'

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
      <Flex alignItems="center">
        <Image
          src="/static/EarthcraftLogo.png"
          alt="Earthcraft-Logo"
          height="6em"
          width="14em"
        />
        <IconButton
          aria-label="Logout"
          icon={<ArrowForwardIcon />}
          size="md"
          variant="outline"
          colorScheme="red"
        />
      </Flex>
      <Flex>
        <Text>Logged in as John</Text>
      </Flex>
    </Flex>
  );
};

export default MobileNavBar;
