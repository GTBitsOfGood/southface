import { Heading, HStack, VStack } from "@chakra-ui/react";
import TagSelect from "./TagSelect";

const TagBox = ({ letter, list }) => {
  return (
    <>
      <HStack
        w={{ base: "15em", "2xl": "20em" }}
        p={7}
        gap={5}
        alignItems="flex-start"
        maxHeight="full"
      >
        <Heading
          w={{ base: "1%", "2xl": "5%" }}
          fontSize={{ base: "xl", "2xl": "2xl" }}
        >
          {letter}
        </Heading>
        <VStack w="100%">
          {list.map((tag) => {
            return <TagSelect key={tag._id} tag={tag} />;
          })}
        </VStack>
      </HStack>
    </>
  );
};

export default TagBox;
