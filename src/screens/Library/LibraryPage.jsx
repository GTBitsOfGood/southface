import { useEffect, useState } from "react";
import { Heading } from "@chakra-ui/react";
import useUser from "src/utils/lib/useUser";
import StandardCard from "src/components/StandardCard";
import SearchBar from "../../components/SearchBar/SearchBar";
import StandardCardTable from "src/components/StandardCardTable";

const LibraryPage = () => {
  const { user: currentUser } = useUser({
    redirectIfFound: false,
    redirectTo: "",
  });

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
      <StandardCardTable
        isLoggedIn={currentUser?.isLoggedIn}
        isAdmin={currentUser?.isAdmin}
      />
    </>
  );
};

export default LibraryPage;
