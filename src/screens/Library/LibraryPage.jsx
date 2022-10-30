import { useState, useEffect } from "react";
import { Heading, Flex, Text } from "@chakra-ui/react";
import SearchBar from "../../components/SearchBar";
import StandardCardTable from "src/components/StandardCardTable";
import useUser from "src/utils/lib/useUser";
import PaginationTab from "../../components/PaginationTab";

const LibraryPage = ({ cardsFromDatabase, numPages }) => {
  const { user: currentUser } = useUser({
    redirectIfFound: false,
    redirectTo: "",
  });

  const [cards, setCards] = useState(cardsFromDatabase);
  const [isRefresehing, setIsRefreshing] = useState(false);
  const [searchString, setSearchString] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setIsRefreshing(false);
  }, [cards]);

  return isRefresehing ? (
    <Text>Loading</Text>
  ) : (
    <Flex alignItems="stretch" flexDirection="column">
      <SearchBar setSearchString={setSearchString} width="full" />
      <Heading fontSize={{ base: "4xl", lg: "5xl" }}> Library</Heading>

      <StandardCardTable
        cards={cards}
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
        setIsRefreshing={setIsRefreshing}
      />
    </Flex>
  );
};

export default LibraryPage;
