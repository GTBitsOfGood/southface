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

const Tag = (props) => {
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
  const [selectedTag, setSelectedTag] = useState([]);

  const selectTag = (id) => {
    const copy = [...selectedTag];
    copy.push(id);
    setSelectedTag(copy);
  };

  const deselectTag = (id) => {
    const copy = [...selectedTag];
    copy.splice(copy.indexOf(id), 1);
    setSelectedTag(copy);
  };

  const handleSubmit = () => {
    tagName &&
      createTag(tagName)
        .catch((error) => window.alert(error.message))
        .then((data) => {
          const firstLetter = data.name.charAt(0).toUpperCase();
          if (!alphabetGroups[firstLetter]) {
            alphabetGroups[firstLetter] = [];
          }
          alphabetGroups[firstLetter].push(data);
          setTagName("");
        });
  };

  return (
    <>
      <VStack gap="1em" width="max">
        <Flex {...props} direction="column" wrap="wrap">
          {tags &&
            Object.keys(alphabetGroups).map((letter) => {
              return (
                <TagBox
                  key={letter}
                  letter={letter}
                  list={alphabetGroups[letter]}
                  selectTag={selectTag}
                  deselectTag={deselectTag}
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
