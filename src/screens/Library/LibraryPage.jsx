import { useEffect, useState } from "react";

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
      <StandardCard />
    </>
  );
};

export default LibraryPage;
