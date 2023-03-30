import { Heading, HStack, VStack } from "@chakra-ui/react";
import TagSelect from "./TagSelect";

const TagBox = ({ letter, list }) => {
  return (
    <>
      <HStack
        w={{ base: "12em", "2xl": "15em" }}
        p={2}
        gap={2}
        alignItems="flex-start"
        maxHeight="full"
      >
        <Heading
          w={{ base: "3%", "2xl": "5%" }}
          fontSize={{ base: "lg", xl: "xl" }}
        >
          {letter}
        </Heading>
        <VStack w="100%" alignItems="flex-start">
          {list.map((tag) => {
            return <TagSelect key={tag._id} tag={tag} />;
          })}
        </VStack>
      </HStack>
    </>
  );
};

export default TagBox;
