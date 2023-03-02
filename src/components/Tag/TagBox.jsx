import { Heading, HStack, VStack } from "@chakra-ui/react";
import TagSelect from "./TagSelect";

const TagBox = (props) => {
  return (
    <>
      <HStack w="20em" p={7} gap={5} alignItems="flex-start" maxHeight="full">
        <Heading w="5%" fontSize="2xl">
          {props.letter}
        </Heading>
        <VStack w="100%">
          {props.list.map((item) => {
            return (
              <TagSelect
                key={item._id}
                id={item._id}
                name={item.name}
                // selectTag={props.selectTag}
                // deselectTag={props.deselectTag}
              />
            );
          })}
        </VStack>
      </HStack>
    </>
  );
};

export default TagBox;
