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
  useBreakpointValue,
  useDisclosure,
  useTheme,
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
  const theme = useTheme();

  const searchBarSize = useBreakpointValue({ base: "md", md: "md", lg: "lg" });
  const showSearchButton = useBreakpointValue({
    base: false,
    md: true,
    lg: true,
  });

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
        variant="Blue"
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
  const calculateRight = () => {
    if (!isClickedSearch || !values.tagArray || values.tagArray.length == 0)
      return "238px";
    if (values.tagArray.length >= 10) {
      return "274px";
    }
    return "263px";
  };
  return (
    <Flex {...rest} justifyContent="flex-end">
      <Box position="relative" right={calculateRight()}>
        <Flex alignItems="center">
          {/* search bar */}
          <InputGroup size={searchBarSize}>
            <InputLeftElement pointerEvents="none">
              <SearchIcon color="lightGrey" />
            </InputLeftElement>
            <Input
              value={searchInput}
              onChange={handleSearchInputChange}
              placeholder={searchPlaceholder}
              style={theme.textStyles.searchBox}
              width="25rem"
              borderRadius="15px"
              border="2px solid lightGrey"
            />
          </InputGroup>
          {/* Submit search button */}
          {showSearchButton && <SearchButton handleSubmit={handleSubmit} />}
        </Flex>
      </Box>
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
            <Text fontFamily="'Europa-Regular', sans-serif" pr={3}>
              Filter {getNumTagsFiltered(values)}
            </Text>
            <ChevronDownIcon />
          </Button>
        )}
        <TabPanels display={isOpen ? "initial" : "none"} mr="-100px">
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
      </Tabs>

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
