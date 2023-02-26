import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
} from "@chakra-ui/react";
import urls from "lib/utils/urls";
import { useState } from "react";
import { createTag } from "src/actions/Tag";
import useSWR from "swr";

const Tag = () => {
  const { data } = useSWR(urls.api.tag.get);
  const tags = data?.payload;

  const [tagName, setTagName] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    createTag(tagName)
      .catch((error) => window.alert(error.message))
      .then((data) => {
        tags.push(data);
        setTagName("");
      });
  };

  return (
    <>
      <VStack gap="1em">
        <Box>
          {tags &&
            tags.map((tag) => {
              return <div key={tag.name}>{tag.name}</div>;
            })}
        </Box>

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
