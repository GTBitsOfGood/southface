import { useState, useEffect } from "react";
import { Heading, Flex, Text } from "@chakra-ui/react";
import SearchBar, { useSearch } from "../../components/SearchBar";
import StandardCardTable from "src/components/StandardCardTable";
import useUser from "src/utils/lib/useUser";
import PaginationTab from "../../components/PaginationTab";

const LibraryPage = ({ cardsFromDatabase, numPages }) => {
  const { user: currentUser } = useUser({
    redirectIfFound: false,
    redirectTo: "",
  });

  const { searchedCards, handleSearch } = useSearch(cardsFromDatabase);
  const [cards, setCards] = useState(cardsFromDatabase);
  const [isRefresehing, setIsRefreshing] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setIsRefreshing(false);
  }, [cards]);

  return isRefresehing ? (
    <Text>Loading</Text>
  ) : (
    <Flex alignItems="stretch" flexDirection="column">
      <Heading fontSize={{ base: "4xl", lg: "5xl" }} pb="5">
        Library
      </Heading>

      <SearchBar handleSearch={handleSearch} />

      <StandardCardTable
        cards={cards}
        isLoggedIn={currentUser?.isLoggedIn}
        isAdmin={currentUser?.isAdmin}
        enablePDFExport={false}
      />

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
