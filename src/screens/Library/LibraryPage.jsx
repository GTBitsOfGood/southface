import { useEffect, useState } from "react";

import StandardCard from "src/components/StandardCard";
import SearchBar from "../../components/SearchBar/SearchBar";

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
      <p>{example}</p>
      <p>
        {searchString === ""
          ? "No searchString"
          : "The search string is: " + searchString}
      </p>
      <StandardCard />
    </>
  );
};

export default LibraryPage;
