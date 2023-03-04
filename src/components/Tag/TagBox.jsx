import { Heading, HStack, VStack } from "@chakra-ui/react";
import TagSelect from "./TagSelect";

const TagBox = (props) => {
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
          {props.letter}
        </Heading>
        <VStack w="100%">
          {props.list.map((item) => {
            return <TagSelect key={item._id} id={item._id} name={item.name} />;
          })}
        </VStack>
      </HStack>
    </>
  );
};

export default TagBox;
