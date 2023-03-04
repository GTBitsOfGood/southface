import { Box, Flex } from "@chakra-ui/react";
import urls from "lib/utils/urls";
import useSWR from "swr";
import TagBox from "./TagBox";

const Tag = () => {
  const { data } = useSWR(urls.api.tag.getObject);
  const tags = data?.payload[0];

  // const [tagName, setTagName] = useState("");
  // const [selectedTag, setSelectedTag] = useState([]);

  // const selectTag = (id) => {
  //   const copy = [...selectedTag];
  //   copy.push(id);
  //   setSelectedTag(copy);
  // };

  // const deselectTag = (id) => {
  //   const copy = [...selectedTag];
  //   copy.splice(copy.indexOf(id), 1);
  //   setSelectedTag(copy);
  // };

  // const handleSubmit = () => {
  //   tagName &&
  //     createTag(tagName)
  //       .catch((error) => window.alert(error.message))
  //       .then((data) => {
  //         const firstLetter = data.name.charAt(0);
  //         if (!tags[firstLetter]) {
  //           tags[firstLetter] = [];
  //         }
  //         tags[firstLetter].push(data);
  //         setTagName("");
  //       });
  // };

  return (
    <>
      {/* <VStack gap="1em" width="max"> */}
      <Flex
        height={{ base: "45em", "2xl": "55em" }}
        direction="column"
        wrap="wrap"
      >
        {tags &&
          Object.keys(tags).map((letter) => {
            return (
              <Box key={letter}>
                <TagBox
                  key={letter}
                  letter={letter}
                  list={tags[letter]}
                  // selectTag={selectTag}
                  // deselectTag={deselectTag}
                />
              </Box>
            );
          })}
      </Flex>
      {/* <Box>
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
        </Box> */}
      {/* </VStack> */}
    </>
  );
};

export default Tag;
