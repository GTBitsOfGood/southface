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
import { FaLongArrowAltRight } from "react-icons/fa";

const SearchBar = (props) => {
  const { handleSearch, ...rest } = props;
  const textInputRef = useRef();

  const handleButtonClick = () => {
    const searchString = textInputRef.current.value;
    handleSearch(searchString);
  };

  return (
    <Flex {...rest} justifyContent="flex-end">
      {/* search bar */}
      <Box mr="1">
        <InputGroup size="lg" borderWidth="">
          <InputLeftAddon bg="transparent" borderRight="none">
            <Icon as={SearchIcon} />
          </InputLeftAddon>
          <Input ref={textInputRef} placeholder="Search specs" />
        </InputGroup>
      </Box>

      <Box mr="3">
        <Select placeholder="Filter" size="lg" borderRadius="lg">
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
        </Select>
      </Box>

      <Button variant="Blue" size="lg" mr="3" onClick={handleButtonClick}>
        <FaLongArrowAltRight />
      </Button>
    </Flex>
  );
};

export default SearchBar;
