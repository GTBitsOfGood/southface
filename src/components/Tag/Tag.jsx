import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  VStack,
} from "@chakra-ui/react";
import urls from "lib/utils/urls";
import { useState } from "react";
import { createTag } from "src/actions/Tag";
import useSWR from "swr";
import TagBox from "./TagBox";

const Tag = () => {
  const { data } = useSWR(urls.api.tag.get);
  const tags = data?.payload;
  const alphabetGroups = {};
  tags?.forEach((item) => {
    const firstLetter = item.name.charAt(0).toUpperCase();
    if (!alphabetGroups[firstLetter]) {
      alphabetGroups[firstLetter] = [];
    }
    alphabetGroups[firstLetter].push(item);
  });

  const [tagName, setTagName] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    createTag(tagName)
      .catch((error) => window.alert(error.message))
      .then((data) => {
        const firstLetter = data.name.charAt(0).toUpperCase();
        if (!alphabetGroups[firstLetter]) {
          alphabetGroups[firstLetter] = [];
        }
        alphabetGroups[firstLetter].push(data);
        alphabetGroups[firstLetter].sort();
        setTagName("");
      });
  };

  return (
    <>
      <VStack gap="1em" width="max">
        <Flex
          //   autoFlow="column"
          //   templateRows={{ base: "repeat(5, 1fr)", "2xl": "repeat(4, 1fr)" }}
          //   gap={3}
          direction="row"
          wrap="wrap"
          w="80em"
          h="min-content"
        >
          {tags &&
            Object.keys(alphabetGroups).map((letter) => {
              return (
                <TagBox
                  key={letter}
                  letter={letter}
                  list={alphabetGroups[letter]}
                />
              );
            })}
        </Flex>
        <Box>
          <FormControl height="4em">
            <FormLabel>Create Tag</FormLabel>
            <Input
              onChange={(event) => {
                setTagName(event.target.value);
              }}
              borderColor="black"
              value={tagName}
            />
          </FormControl>
          <Button
            width="100%"
            height="2.3em"
            colorScheme="green"
            onClick={handleSubmit}
            marginTop="1em"
            marginBottom="1em"
          >
            Create
          </Button>
        </Box>
      </VStack>
    </>
  );
};

export default Tag;
