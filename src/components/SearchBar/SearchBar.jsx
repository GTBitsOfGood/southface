import { Icon, SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Input,
  InputGroup,
  InputLeftAddon,
  Select,
} from "@chakra-ui/react";

import { useRef } from "react";
// import {
//   BiCategory as CategoryIcon,
//   BiFilter as FilterIcon,
// } from "react-icons/bi";
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
  // const TagDeleter = (tag) => () =>
  //   setSearch((search) => {
  //     const prevSearch = { ...search };
  //     delete prevSearch.tags[tag];
  //     return prevSearch;
  //   });

  // const { isOpen, onOpen, onClose } = useDisclosure({
  //   defaultIsOpen: popUpOnLoad,
  // });

  // const buttonStyles = {
  //   borderRadius: "9999px",
  // };

  return (
    <>
      {/* {allowTemplates && (
        <ChooseTemplateModal
          isOpen={isOpen}
          onClose={onClose}
          setFilterTags={setTags}
        />
      )} */}
      <Flex {...rest} justifyContent="flex-end">
        {/* search bar */}
        <Box mb="3">
          <InputGroup size="lg">
            <InputLeftAddon bg="transparent" borderRight="none">
              <Icon as={SearchIcon} />
            </InputLeftAddon>
            <Input ref={textInput} placeholder="Search specs" />
            {/* <InputRightAddon>
              <Icon
                as={SearchIcon}
                onClick={() =>
                  setSearch({
                    searchString: textInput.current.value,
                    tags: criteria.tags,
                  })
                }
              />
            </InputRightAddon> */}
          </InputGroup>
        </Box>
        {/* filter  */}

        <Box mb="3">
          <Select placeholder="Filter">
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </Select>
        </Box>

        <Button
          colorScheme="blue"
          onClick={() =>
            setSearch({
              searchString: textInput.current.value,
              tags: criteria.tags,
            })
          }
        >
          Submit
        </Button>

        {/* enter button  */}

        {/* <Flex width="100%" flexFlow="row wrap" gap="5"> */}
        {/* {Object.keys(criteria.tags).map((tag, index) => (
            <Button
              {...buttonStyles}
              bgColor="#f1f1f1"
              onClick={TagDeleter(tag)}
              key={index}
            >
              &quot;{tag}&quot; <Icon key={index} as={CloseIcon} ml="3" />
            </Button>
          ))} */}

        {/* add filter tag
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
          </InputGroup> */}

        {/* clear filter tag and template buttons
          <Button bgColor="red.200" {...buttonStyles} onClick={ClearFilterTags}>
            Clear filters
          </Button>
          {allowTemplates && (
            <Button {...buttonStyles} onClick={onOpen} bgColor="green.200">
              View Templates <Icon as={CategoryIcon} fontSize="xl" ml="1.5" />
            </Button>
          )} */}
        {/* </Flex> */}
      </Flex>
    </>
  );
};

export default SearchBar;
