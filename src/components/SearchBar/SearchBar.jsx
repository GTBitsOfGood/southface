import {
  ArrowForwardIcon,
  ChevronDownIcon,
  CloseIcon,
  Icon,
  SearchIcon,
} from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Input,
  InputGroup,
  InputLeftAddon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";

import { useRef } from "react";
// import ChooseTemplateModal from "../../components/Modals/ChooseTemplateModal";

const SearchBar = (props) => {
  const {
    handleSearch = {
      setSearch: () => undefined,
      criteria: {
        searchString: "",
        tags: {},
      },
    },
    // allowTemplates = true,
    // popUpOnLoad = false,
    ...rest
  } = props;
  const { setSearch, criteria } = handleSearch;
  const textInput = useRef();
  // const tagInput = useRef();

  // const AddFilterTag = () => {
  //   if (tagInput.current.value === "") {
  //     tagInput.current.focus();
  //   } else {
  //     setSearch((search) => {
  //       const prevSearch = { ...search };
  //       prevSearch.tags[tagInput.current.value] = true;
  //       tagInput.current.value = "";
  //       return prevSearch;
  //     });
  //   }
  // };
  // const ClearFilterTags = () =>
  //   setSearch((search) => {
  //     const prevSearch = { ...search };
  //     prevSearch.tags = {};
  //     return prevSearch;
  //   });
  // const setTags = (tags) =>
  //   setSearch((search) => {
  //     const prevSearch = { ...search };
  //     prevSearch.tags = tags;
  //     return prevSearch;
  //   });
  // const setSearchString = (string = textInput.current.value) => {
  //   setSearch((search) => {
  //     const prevSearch = { ...search };
  //     prevSearch.searchString = string;
  //     return prevSearch;
  //   });
  // };

  const TagDeleter = (tag) => () =>
    setSearch((search) => {
      const prevSearch = { ...search };
      delete prevSearch.tags[tag];
      return prevSearch;
    });

  // const { isOpen, onOpen, onClose } = useDisclosure({
  //   defaultIsOpen: popUpOnLoad,
  // });

  const buttonStyles = {
    borderRadius: "9999px",
  };

  return (
    <>
      {/* {allowTemplates && (
        <ChooseTemplateModal
          isOpen={isOpen}
          onClose={onClose}
          setFilterTags={setTags}
        />
      )} */}
      <Flex {...rest}>
        <Flex alignContent="flex-end">
          <Box>
            <InputGroup>
              <InputLeftAddon bg="none">
                <Icon as={SearchIcon} onClick={handleSearch} />
              </InputLeftAddon>
              <Input ref={textInput} placeholder="Search for a standard" />

              <Menu>
                <Flex>
                  <MenuButton
                    as={Button}
                    rightIcon={<ChevronDownIcon />}
                    variant="outline"
                  >
                    Filters
                  </MenuButton>
                  <MenuList>
                    <MenuItem>Tag 1</MenuItem>
                    <MenuItem>Tag 2</MenuItem>
                    <MenuItem>Tag 3</MenuItem>
                  </MenuList>
                </Flex>
              </Menu>

              <Button>
                <ArrowForwardIcon />
              </Button>
            </InputGroup>
          </Box>
        </Flex>

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

          {/* <InputGroup flex="500px">
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
          </InputGroup> */}

          {/* clear filter */}
          {/* <Button bgColor="red.200" {...buttonStyles} onClick={ClearFilterTags}>
            Clear filters
          </Button> */}

          {/* view template */}
          {/* {allowTemplates && (
            <Button {...buttonStyles} onClick={onOpen} bgColor="green.200">
              View Templates <Icon as={CategoryIcon} fontSize="xl" ml="1.5" />
            </Button>
          )} */}
        </Flex>
      </Flex>
    </>
  );
};

export default SearchBar;
