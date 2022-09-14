import { useEffect, useState } from "react";

import StandardCardTable from "src/components/StandardCardTable";

const LibraryPage = () => {
  const [books, setBooks] = useState([]);

  const [example, setExample] = useState("");
  useEffect(() => {
    setExample("Example here");
  }, []);

  return (
    <>
      <StandardCardTable />
    </>
  );
};

export default LibraryPage;
