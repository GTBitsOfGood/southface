import { CloseIcon, Icon, SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Input,
  InputGroup,
  InputRightAddon,
  useDisclosure,
} from "@chakra-ui/react";
import { useRef } from "react";
import {
  BiCategory as CategoryIcon,
  BiFilter as FilterIcon,
} from "react-icons/bi";
import ChooseTemplateModal from "../../components/Modals/ChooseTemplateModal";

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
    ...rest
  } = props;
  const { setSearch, criteria } = handleSearch;
  const textInput = useRef();
  const tagInput = useRef();

  const AddFilterTag = () => {
    if (tagInput.current.value === "") {
      tagInput.current.focus();
    } else {
      setSearch((search) => {
        const prevSearch = { ...search };
        prevSearch.tags[tagInput.current.value] = true;
        tagInput.current.value = "";
        return prevSearch;
      });
    }
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

  const buttonStyles = {
    borderRadius: "9999px",
  };

  return (
    <>
      {allowTemplates && (
        <ChooseTemplateModal
          isOpen={isOpen}
          onClose={onClose}
          setFilterTags={setTags}
        />
      )}
      <Flex margin="auto" width="80%" {...rest} flexDirection="column">
        <Box mb="3">
          <InputGroup size="lg">
            <Input
              ref={textInput}
              placeholder="Search specs"
              onInput={() => setSearchString(textInput.current.value)}
            />
            <InputRightAddon>
              <Icon as={SearchIcon} />
            </InputRightAddon>
          </InputGroup>
        </Box>
        <Flex width="100%" flexFlow="row wrap" gap="5">
          {Object.keys(criteria.tags).map((tag, index) => (
            <Button
              {...buttonStyles}
              bgColor="#f1f1f1"
              onClick={TagDeleter(tag)}
              key={index}
            >
              &quot;{tag}&quot; <Icon key={index} as={CloseIcon} ml="3" />
            </Button>
          ))}
          <InputGroup flex="500px">
            <Input
              borderRadius="9999px"
              ref={tagInput}
              placeholder="Add Tag Filter"
              onInput={() => setSearchString(textInput.current.value)}
            />
            <InputRightAddon borderRadius="9999px" onClick={AddFilterTag}>
              <Button m="-3" p="3" bgColor="transparent">
                <Icon fontSize="2xl" as={FilterIcon} />
                Add filter
              </Button>
            </InputRightAddon>
          </InputGroup>
          <Button bgColor="red.200" {...buttonStyles} onClick={ClearFilterTags}>
            Clear filters
          </Button>
          {allowTemplates && (
            <Button {...buttonStyles} onClick={onOpen} bgColor="green.200">
              View Templates <Icon as={CategoryIcon} fontSize="xl" ml="1.5" />
            </Button>
          )}
        </Flex>
      </Flex>
    </>
  );
};

export default SearchBar;
