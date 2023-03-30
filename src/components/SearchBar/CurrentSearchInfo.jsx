import { CloseIcon } from "@chakra-ui/icons";
import { Box, HStack, IconButton, Tag, Text, Wrap } from "@chakra-ui/react";

const CurrentSearchInfo = ({
  handleSearch,
  searchString,
  location,
  tags,
  setResetSearch,
  setTagToClear,
}) => {
  const clearTags = () => {
    setResetSearch(true);
    handleSearch({ searchString: searchString, tags: [] });
  };

  const clearSingleTag = (tagToClear) => {
    setTagToClear(tagToClear);
    const newArray = tags ? tags.filter((tag) => tag !== tagToClear) : null;
    handleSearch({ searchString: searchString, tags: newArray });
  };

  if (searchString === "" && tags.length == 0) {
    return;
  }
  return (
    <Box mt={5} mb={0}>
      {searchString !== "" && (
        <Text fontSize="lg" fontWeight="500">
          You searched for &quot;{searchString}&quot; in {location}
        </Text>
      )}
      {tags.length > 0 && (
        <HStack gap={1} my={2}>
          <Wrap>
            {tags.map((tag, idx) => {
              return (
                <Tag key={idx} py={1} bgColor="#F2F2F2">
                  <Text pr={2} color="Grey">
                    {tag}
                  </Text>
                  <IconButton
                    icon={<CloseIcon />}
                    variant="unstyled"
                    size="xs"
                    color="Grey"
                    onClick={() => clearSingleTag(tag)}
                  />
                </Tag>
              );
            })}
            <Text
              as="u"
              color="Blue"
              cursor="pointer"
              fontWeight="500"
              display="flex"
              alignItems="center"
              onClick={clearTags}
            >
              Clear all
            </Text>
          </Wrap>
        </HStack>
      )}
    </Box>
  );
};

export default CurrentSearchInfo;
