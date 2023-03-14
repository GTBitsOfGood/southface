import {
  CloseButton,
  Flex,
  HStack,
  Icon,
  Text,
  VStack,
} from "@chakra-ui/react";
import { MdThumbDown, MdThumbUp } from "react-icons/md";

const InformationPreview = (props) => {
  return (
    <VStack alignItems="flex-end">
      <CloseButton
        position="absolute"
        bg="Grey"
        borderRadius="2em"
        _hover={{ bg: "Grey" }}
        onClick={props.onClick}
        color="white"
        right="0.7em"
        h="2em"
        w="2em"
      />
      <Flex
        background="LightGrey"
        height="5em"
        border="solid grey"
        borderRadius="0.8em"
        alignItems="center"
        justifyContent="center"
        width="100%"
      >
        <HStack>
          <HStack>
            <Text>700</Text>
            <Icon as={MdThumbUp} color="Blue" />
          </HStack>
          <HStack>
            <Text>700</Text>
            <Icon as={MdThumbDown} color="Blue" />
          </HStack>
        </HStack>
      </Flex>
    </VStack>
  );
};

export default InformationPreview;
