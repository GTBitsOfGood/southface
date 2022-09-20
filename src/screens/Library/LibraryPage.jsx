import { useEffect, useState } from "react";
import { Heading } from "@chakra-ui/react";

import StandardCard from "src/components/StandardCard";
import SearchBar from "../../components/SearchBar/SearchBar";
import StandardCardTable from "src/components/StandardCardTable";

const LibraryPage = () => {
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
      <StandardCardTable />
    </>
  );
};

export default LibraryPage;
