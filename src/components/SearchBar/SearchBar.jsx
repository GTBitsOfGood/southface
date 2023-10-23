import { ChevronDownIcon, ChevronUpIcon, SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Form, useForm, useFormState } from "react-final-form";
import Tag from "../Tag";

const SearchBarComponent = (props) => {
  const {
    resetSearch,
    setResetSearch,
    handleSubmit,
    searchInput,
    isClickedSearch,
    setSearchInput,
    tagToClear,
    setTagToClear,
    pageType,
    ...rest
  } = props;

  const { values } = useFormState();
  const { mutators } = useForm();

  const { isOpen, onToggle } = useDisclosure();
  const searchPlaceholder = "Search within " + pageType;

  useEffect(() => {
    if (resetSearch) {
      mutators.setValue("tagArray", null);
      setResetSearch(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetSearch, setResetSearch]);

  useEffect(() => {
    const newArray = values.tagArray
      ? values.tagArray.filter((tag) => tag !== tagToClear)
      : null;
    mutators.setValue("tagArray", newArray);
    setTagToClear(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tagToClear, setTagToClear]);

  const handleApplyFiltersClick = (handleSubmit) => {
    onToggle();
    handleSubmit();
  };

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const getNumTagsFiltered = (values) => {
    return isClickedSearch && values.tagArray && values.tagArray.length > 0
      ? `(${values.tagArray.length})`
      : "";
  };

  const SearchButton = ({ handleSubmit }) => {
    return (
      <Button
        bg="lightgrey"
        color="Grey"
        size="lg"
        fontSize="15px"
        fontWeight="bold"
        fontFamily="'Europa-Regular', sans-serif"
        onClick={handleSubmit}
        paddingLeft="2rem"
        paddingRight="2rem"
      >
        Search
      </Button>
    );
  };

  return (
    <Flex {...rest} justifyContent="flex-end" position="relative" gap="10px">
      <Box position="absolute" mr="238px">
        {/* <Flex alignItems="center"> */}
        {/* search bar */}
        <InputGroup size="lg">
          <InputLeftElement pointerEvents="none">
            <SearchIcon color="lightGrey" />
          </InputLeftElement>
          <Input
            value={searchInput}
            onChange={handleSearchInputChange}
            placeholder={searchPlaceholder}
            fontWeight="400"
            fontSize="16px"
            fontFamily="'Europa-Regular', sans-serif"
            width="25rem"
            borderRadius="15px"
            border="2px solid lightGrey"
          />
        </InputGroup>

        {/* </Flex> */}
      </Box>
      {/* Filter tab */}
      {/* <Box mr="3"> */}
      <Tabs variant="enclosed" h="full" align="end">
        {isOpen ? (
          <TabList>
            <Box
              border="1px solid Grey"
              borderBottom="none"
              roundedTop={8}
              roundedBottom={0}
            >
              <Tab
                color="Grey"
                bgColor="#F2F2F2"
                border="none"
                onClick={onToggle}
                fontSize="lg"
                px={4}
                pb={isOpen ? 5 : 3}
              >
                <Text pr={3} fontFamily="'Europa-Regular', sans-serif">
                  Filter {getNumTagsFiltered(values)}
                </Text>
                <ChevronUpIcon />
              </Tab>
            </Box>
          </TabList>
        ) : (
          <Button
            p={4}
            pt={3}
            rounded={8}
            bgColor="#F2F2F2"
            color="Grey"
            border="1px solid Grey"
            _hover={{ bgColor: "#d9d9d9" }}
            _active={{ bgColor: "#c1c1c1" }}
            size="lg"
            fontFamily="'Europa-Regular', sans-serif"
            fontSize="lg"
            onClick={onToggle}
          >
            <Text pr={3}>Filter {getNumTagsFiltered(values)}</Text>
            <ChevronDownIcon />
          </Button>
        )}
        {/* <Box position="absolute" top="100%" left="0" width="100vw" zIndex="10"> */}
        <TabPanels
          display={isOpen ? "initial" : "none"}
          // backgroundColor="#F2F2F2"
          mr="-100px"
          // position="absolute"
        >
          <TabPanel
            width={{ base: "75em", "2xl": "80em" }}
            border="1px solid Grey"
            rounded={8}
            roundedTopRight={0}
            bgColor="#F2F2F2"
            position="relative"
          >
            <Tag height="65vh" overflow="auto" />
            <Button
              p={4}
              variant="Blue"
              pos="absolute"
              right="2em"
              bottom="2em"
              onClick={() => handleApplyFiltersClick(handleSubmit)}
            >
              Apply Filters {getNumTagsFiltered(values)}
            </Button>
          </TabPanel>
        </TabPanels>
        {/* </Box> */}
      </Tabs>
      {/* </Box> */}

      {/* Submit search button */}
      <SearchButton handleSubmit={handleSubmit} />
    </Flex>
  );
};

const SearchBar = (props) => {
  const [searchInput, setSearchInput] = useState("");
  const [isClickedSearch, setIsClickedSearch] = useState(false);

  const handleSearchButtonClick = (values) => {
    values.tagArray && values.tagArray.length == 0
      ? setIsClickedSearch(false)
      : setIsClickedSearch(true);
    props.handleSearch({
      searchString: searchInput,
      tags: values.tagArray || [],
    });
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter" || event.key === "Return") {
      props.handleSearch({
        searchString: searchInput,
        tags: event.tagArray || [],
      });
    }
  };

  return (
    <Form
      onSubmit={handleSearchButtonClick}
      mutators={{
        setValue: ([field, value], state, { changeValue }) => {
          changeValue(state, field, () => value);
        },
      }}
    >
      {({ handleSubmit }) => (
        <SearchBarComponent
          handleSubmit={handleSubmit}
          onKeyDown={handleKeyPress}
          isClickedSearch={isClickedSearch}
          searchInput={searchInput}
          setSearchInput={setSearchInput}
          pageType={props.pageType}
          {...props}
        />
      )}
    </Form>
  );
};

export default SearchBar;
