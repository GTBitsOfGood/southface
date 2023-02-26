import {
  Box,
  Button,
  Flex,
  FormLabel,
  useColorModeValue,
} from "@chakra-ui/react";
import InputControl from "../FormComponents/InputControl";

const CreateTag = () => {
  return (
    <Box mb={4}>
      <FormLabel
        fontSize="xl"
        color="#8C8C8C"
        fontWeight="bold"
        textAlign="left"
        mb={1}
        mt={5}
      >
        Create a New Tag
      </FormLabel>
      <InputControl name="tag" label="Title of Tag" />
      <Flex w="100%" justifyContent="right" mt={3}>
        <Button
          bgColor={useColorModeValue("blackAlpha.500")}
          _hover={{
            bgColor: `${useColorModeValue("blackAlpha.600")}`,
          }}
          color="white"
          size="sm"
          rounded={16}
          fontSize="md"
          width="auto"
        >
          Create Tag
        </Button>
      </Flex>
    </Box>
  );
};

export default CreateTag;
