import ChooseTemplateModal from "../../components/Modals/ChooseTemplateModal";
import { Box, Button, Flex, Input, Tag, useDisclosure } from "@chakra-ui/react";
import { useRef } from "react";

const SearchBar = (props) => {
  const {
    handleSearch = {
      setSearch: () => undefined,
      criteria: {
        searchString: "",
        tags: {},
      },
    },
    allowTemplates = true,
    popUpOnLoad = false,
  } = props;
  const { setSearch, criteria } = handleSearch;

  const textInput = useRef();
  const tagInput = useRef();

  const AddFilterTag = () => {
    setSearch((search) => {
      const prevSearch = { ...search };
      prevSearch.tags[tagInput.current.value] = true;
      return prevSearch;
    });
    tagInput.current.value = "";
  };
  const ClearFilterTags = () =>
    setSearch((search) => {
      const prevSearch = { ...search };
      prevSearch.tags = {};
      return prevSearch;
    });
  const setTags = (tags) =>
    setSearch((search) => {
      const prevSearch = { ...search };
      prevSearch.tags = tags;
      return prevSearch;
    });
  const setSearchString = (string = textInput.current.value) => {
    setSearch((search) => {
      const prevSearch = { ...search };
      prevSearch.searchString = string;
      return prevSearch;
    });
  };

  const TagDeleter = (tag) => () =>
    setSearch((search) => {
      const prevSearch = { ...search };
      delete prevSearch.tags[tag];
      return prevSearch;
    });

  const { isOpen, onOpen, onClose } = useDisclosure({
    defaultIsOpen: popUpOnLoad,
  });
  return (
    <>
      {allowTemplates && (
        <ChooseTemplateModal
          isOpen={isOpen}
          onClose={onClose}
          setFilterTags={setTags}
        />
      )}
      <Flex flexDirection="row">
        <Box flex="1">
          <Input
            ref={textInput}
            size="lg"
            placeholder="Search specs"
            onInput={() => setSearchString(textInput.current.value)}
          />
          <Flex>
            {Object.keys(criteria.tags).map((tag, index) => (
              <Tag cursor="pointer" onClick={TagDeleter(tag)} key={index}>
                {tag}
              </Tag>
            ))}
          </Flex>
        </Box>
        <Box>
          <Input ref={tagInput} placeholder="Add Tag Filter" />
          <Button onClick={AddFilterTag}>Add filter</Button>
          <Button onClick={ClearFilterTags}>Clear filters</Button>
          {allowTemplates && <Button onClick={onOpen}>View Categories</Button>}
        </Box>
      </Flex>
    </>
  );
};

export default SearchBar;
