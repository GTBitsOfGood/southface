import { useEffect, useState } from "react";
import { Heading } from "@chakra-ui/react";
import SearchBar from "../../components/SearchBar";
import { useSearch } from "../../components/SearchBar";
import StandardCardTable from "src/components/StandardCardTable";
import useUser from "src/utils/lib/useUser";

const LibraryPage = ({ cards }) => {
  const { user: currentUser } = useUser({
    redirectIfFound: false,
    redirectTo: "",
  });

  const { searchedCards, handleSearch } = useSearch(cards);
  return (
    <>
      <SearchBar handleSearch={handleSearch} />
      <Heading fontSize={{ base: "4xl", lg: "5xl" }}> Library</Heading>

      <StandardCardTable
        cards={searchedCards}
        isLoggedIn={currentUser?.isLoggedIn}
        isAdmin={currentUser?.isAdmin}
      />
    </>
  );
};

export default LibraryPage;
