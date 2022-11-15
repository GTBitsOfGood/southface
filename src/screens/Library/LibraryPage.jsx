import { useState, useEffect } from "react";
import { Heading, Flex, Text } from "@chakra-ui/react";
import SearchBar from "../../components/SearchBar";
import { useSearch } from "../../components/SearchBar";
import StandardCardTable from "src/components/StandardCardTable";
import useUser from "src/utils/lib/useUser";
import PaginationTab from "../../components/PaginationTab";

const LibraryPage = ({ cardsFromDatabase, numPagesInitial }) => {
  const { user: currentUser } = useUser({
    redirectIfFound: false,
    redirectTo: "",
  });
  

  const [cards, setCards] = useState(cardsFromDatabase);

  const [searchString, setSearchString] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [numPages, setNumPages] = useState(numPagesInitial);
  const { searchedCards, handleSearch } = useSearch(
    cardsFromDatabase,
    setNumPages,
    setCurrentPage,
    setCards
  );

  return (
    <Flex alignItems="stretch" flexDirection="column">
      <SearchBar
        handleSearch={handleSearch}
        setNumPages={setNumPages}
        setCurrentPage={setCurrentPage}
      />
      <Heading fontSize={{ base: "4xl", lg: "5xl" }}> Library</Heading>

      <StandardCardTable
        cards={cards}
        setCards={setCards}
        isLoggedIn={currentUser?.isLoggedIn}
        isAdmin={currentUser?.isAdmin}
      />

      <PaginationTab
        numPages={numPages}
        alignSelf="center"
        border="1px solid black"
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        setCards={setCards}
      />
    </Flex>
  );
};

export default LibraryPage;
