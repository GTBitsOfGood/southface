import { useEffect, useState } from "react";
import { Heading } from "@chakra-ui/react";

import SearchBar from "../../components/SearchBar";
import StandardCardTable from "src/components/StandardCardTable";

const LibraryPage = ({ cards }) => {
  const [books, setBooks] = useState([]);
  const [searchString, setSearchString] = useState("");
  const [example, setExample] = useState("");
  useEffect(() => {
    setExample("Example here");
  }, []);

  return (
    <>
      <SearchBar setSearchString={setSearchString} />
      <Heading>Library</Heading>
      <StandardCardTable cards={cards} />
    </>
  );
};

export default LibraryPage;
