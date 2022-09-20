import { useEffect, useState } from "react";
import { Heading } from "@chakra-ui/react";

import StandardCardTable from "src/components/StandardCardTable";

const LibraryPage = () => {
  const [books, setBooks] = useState([]);

  const [example, setExample] = useState("");
  useEffect(() => {
    setExample("Example here");
  }, []);

  return (
    <>
      <Heading>Library</Heading>
      <StandardCardTable />
    </>
  );
};

export default LibraryPage;
