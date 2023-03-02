import { Icon, SearchIcon } from "@chakra-ui/icons";
import { FaLongArrowAltRight } from "react-icons/fa";

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

const SearchBar = (props) => {
  const {
    handleSearch = {
      setSearch: () => undefined,
      criteria: {
        searchString: "",
        tags: {},
      },
    },

    ...rest
  } = props;
  const { setSearch, criteria } = handleSearch;
  const textInput = useRef();

  return (
    <>
      <Flex {...rest} justifyContent="flex-end">
        {/* search bar */}
        <Box mr="1">
          <InputGroup size="lg" borderWidth="">
            <InputLeftAddon bg="transparent" borderRight="none">
              <Icon as={SearchIcon} />
            </InputLeftAddon>
            <Input ref={textInput} placeholder="Search specs" />
          </InputGroup>
        </Box>

        <Box mr="3">
          <Select placeholder="Filter" size="lg" borderRadius="lg">
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </Select>
        </Box>

        <Button
          variant="Blue"
          size="lg"
          mr="3"
          onClick={() =>
            setSearch({
              searchString: textInput.current.value,
              tags: criteria.tags,
            })
          }
        >
          {<FaLongArrowAltRight />}
        </Button>
      </Flex>
    </>
  );
};

export default SearchBar;
