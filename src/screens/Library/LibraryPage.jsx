import { Flex, Heading } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import StandardCardTable from "src/components/StandardCardTable";
import PaginationTab from "../../components/PaginationTab";
import SearchBar, { useSearch } from "../../components/SearchBar";

const LibraryPage = ({ cardsFromDatabase, numPagesInitial }) => {
  const [cards, setCards] = useState(cardsFromDatabase);
  const [isRefresehing, setIsRefreshing] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [numPages, setNumPages] = useState(numPagesInitial);
  const { handleSearch } = useSearch(
    cardsFromDatabase,
    setNumPages,
    setCurrentPage,
    setCards
  );

  // Without this useEffect, it opens modals for inconsistent cards with regards to pagination.
  useEffect(() => {
    setIsRefreshing(false);
  }, [cards]);

  return isRefresehing ? (
    ""
  ) : (
    <Flex alignItems="stretch" flexDirection="column">
      <Heading fontSize={{ base: "4xl", lg: "5xl" }} pb="5">
        {" "}
        Library
      </Heading>

      <SearchBar
        handleSearch={handleSearch}
        setNumPages={setNumPages}
        setCurrentPage={setCurrentPage}
      />

      <StandardCardTable cards={cards} setCards={setCards} />

      <PaginationTab
        numPages={numPages}
        alignSelf="center"
        border="1px solid black"
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        setCards={setCards}
        setIsRefreshing={setIsRefreshing}
      />
    </Flex>
  );
};

export default LibraryPage;
