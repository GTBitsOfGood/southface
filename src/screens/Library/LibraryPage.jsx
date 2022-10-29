import { useState, useEffect } from "react";
import { Heading, Flex } from "@chakra-ui/react";
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

  useEffect(() => {
    setCards[cardsFromDatabase];
  }, [cards]);

  const lastCardId = cards[cards.length - 1]._id;

  const [searchString, setSearchString] = useState("");

  return (
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
        lastCardId={lastCardId}
        border="1px solid black"
      />
    </Flex>
  );
};

export default LibraryPage;
