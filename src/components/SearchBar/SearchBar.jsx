import { CloseIcon, Icon, SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Input,
  InputGroup,
  InputLeftAddon,
  Popover,
  PopoverArrow,
  PopoverContent,
  PopoverTrigger,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaLongArrowAltRight } from "react-icons/fa";
import Tag from "../Tag/Tag";

const SearchBar = (props) => {
  const { handleSearch, ...rest } = props;
  const [isClickedSearch, setIsClickedSearch] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    if (searchInput === "") {
      setIsClickedSearch(false);
    }
  }, [searchInput]);

  const handleSearchButtonClick = () => {
    setIsClickedSearch(true);
    handleSearch({ searchString: searchInput });
  };

  const handleExitSearchButtonClick = () => {
    handleSearch({});
    setSearchInput("");
    setIsClickedSearch(false);
  };

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const SearchButton = () =>
    isClickedSearch ? (
      <Button
        variant="Blue"
        size="lg"
        mr="3"
        onClick={handleExitSearchButtonClick}
      >
        <CloseIcon boxSize="12px" />
      </Button>
    ) : (
      <Button variant="Blue" size="lg" mr="3" onClick={handleSearchButtonClick}>
        <FaLongArrowAltRight />
      </Button>
    );

  return (
    <Flex {...rest} justifyContent="flex-end">
      {/* search bar */}
      <Box mr="1">
        <InputGroup size="lg" borderWidth="">
          <InputLeftAddon bg="transparent" borderRight="none">
            <Icon as={SearchIcon} />
          </InputLeftAddon>
          <Input
            value={searchInput}
            onChange={handleSearchInputChange}
            placeholder="Search Cards"
          />
        </InputGroup>
      </Box>
      <Box mr="3">
      <Popover placement="bottom-end">
        <PopoverTrigger>
          <Button variant="Grey-outlined" size="lg">Filter</Button>
        </PopoverTrigger>
        <PopoverContent width={{ base: "75em", "2xl": "80em" }}>
          <PopoverArrow />
          <Tag height={{ base: "45em", "2xl": "55em" }} />
        </PopoverContent>
      </Popover>
      </Box>
      <SearchButton />
    </Flex>
  );
};

export default SearchBar;
