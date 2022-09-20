import { Input } from "@chakra-ui/react";
import { useRef } from "react";

const SearchBar = ({ setSearchString }) => {
  const self = useRef();

  return (
    <Input
      ref={self}
      size="lg"
      placeholder="Search specs"
      onInput={() => setSearchString(self.current.value)}
    />
  );
};

export default SearchBar;
