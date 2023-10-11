import { SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Form, useForm, useFormState } from "react-final-form";

const SearchBarComponent = (props) => {
  const {
    resetSearch,
    setResetSearch,
    handleSubmit,
    searchInput,
    setSearchInput,
    tagToClear,
    setTagToClear,
    pageType,
    ...rest
  } = props;

  const { values } = useFormState();
  const { mutators } = useForm();

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

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const SearchButton = ({ handleSubmit }) => {
    return (
      <Button
        bg="lightgrey"
        color="black"
        size="lg"
        fontSize="18px"
        fontFamily="'Europa-Regular', sans-serif"
        onClick={handleSubmit}
      >
        Search
      </Button>
    );
  };

  return (
    <Flex {...rest} justifyContent="flex-end">
      <Box position="relative">
        <Flex alignItems="center">
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

          {/* Submit search button */}
          <SearchButton handleSubmit={handleSubmit} />
        </Flex>
      </Box>
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
