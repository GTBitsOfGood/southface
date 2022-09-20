import { useEffect, useState } from "react";
import { Heading } from "@chakra-ui/react";

import StandardCard from "src/components/StandardCard";

const LibraryPage = () => {
  const [books, setBooks] = useState([]);

  const [example, setExample] = useState("");
  useEffect(() => {
    setExample("Example here");
  }, []);

  return (
    <>
      <p>{example}</p>
      <Heading py={3}>Card Component</Heading>
      <StandardCard />
    </>
  );
};

export default LibraryPage;
