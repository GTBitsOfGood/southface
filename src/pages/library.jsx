import { Flex, Heading } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import PaginationTab from "src/components/PaginationTab";
import SearchBar, { useSearch } from "src/components/SearchBar";
import StandardCardTable from "src/components/StandardCardTable";
import {
  getCardsCount,
  getCardsPagination,
} from "../../server/mongodb/actions/Card";
import NavBar from "../components/NavBar /NavBar";
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
      <SearchBar handleSearch={handleSearch} />
      {/* Navbar is used for testing purposes for the ShoppingCart Component */}
      <NavBar />
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
      BiBookBookmark
    </Flex>
  );
};

/**
 * Errors in getServerSideProps will display the page in 'pages/500.js' (https://nextjs.org/docs/basic-features/data-fetching/get-server-side-props)
 */
export async function getServerSideProps() {
  const pageNumber = 0;
  const cards = await getCardsPagination(pageNumber);
  const cardsCount = await getCardsCount();
  let numPages = Math.floor(cardsCount / 4);

  if (cardsCount % 4 > 0) {
    numPages += 1;
  }

  return {
    props: {
      cardsFromDatabase: JSON.parse(JSON.stringify(cards)),
      numPages,
      pageNumber: pageNumber + 1,
    },
  };
}

export default LibraryPage;
