import { useState } from "react";
import { Heading } from "@chakra-ui/react";
import SearchBar from "../../components/SearchBar";
import StandardCardTable from "src/components/StandardCardTable";
import useUser from "src/utils/lib/useUser";

const LibraryPage = ({ cards }) => {
  const { user: currentUser } = useUser({
    redirectIfFound: false,
    redirectTo: "",
  });

  const [searchString, setSearchString] = useState("");

  return (
    <>
      <SearchBar setSearchString={setSearchString} />
      <Heading fontSize={{ base: "4xl", lg: "5xl" }}>Library</Heading>
      <StandardCardTable
        cards={cards}
        isLoggedIn={currentUser?.isLoggedIn}
        isAdmin={currentUser?.isAdmin}
      />
    </>
  );
};

export default LibraryPage;
