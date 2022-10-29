import ChooseTemplateModal from "../../components/Modals/ChooseTemplateModal";
import { Box, Button, Flex, Input, Tag, useDisclosure } from "@chakra-ui/react";
import { useRef } from "react";

const SearchBar = (props) => {
  const {
    setSearchString = () => undefined,
    setFilterTags = () => undefined,
    filterTags = {},
    allowTemplates = true,
    popUpOnLoad = false,
    ...rest
  } = props;

  const self = useRef();
  const tagInput = useRef();

  const AddFilterTag = () => {
    const newFilterTags = { ...filterTags };
    newFilterTags[tagInput.current.value] = true;
    setFilterTags(newFilterTags);
    tagInput.current.value = "";
  };
  const ClearFilterTags = () => setFilterTags({});
  const TagDeleter = (tag) => () => {
    const newFilterTags = { ...filterTags };
    delete newFilterTags[tag];
    setFilterTags(newFilterTags);
  };
  const { isOpen, onOpen, onClose } = useDisclosure({
    defaultIsOpen: popUpOnLoad,
  });
  return (
    <>
      {allowTemplates && (
        <ChooseTemplateModal
          isOpen={isOpen}
          onClose={onClose}
          setFilterTags={setFilterTags}
        />
      )}
      <Flex {...rest} flexDirection="row">
        <Box flex="1">
          <Input
            ref={self}
            size="lg"
            placeholder="Search specs"
            onInput={() => setSearchString(self.current.value)}
          />
          <Flex>
            {Object.keys(filterTags).map((tag, index) => (
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
