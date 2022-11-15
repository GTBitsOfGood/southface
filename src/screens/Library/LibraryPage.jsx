import { useState, useEffect, createRef } from "react";
import { Heading, Box, Button, Flex, Text } from "@chakra-ui/react";
import SearchBar from "../../components/SearchBar";
import { useSearch } from "../../components/SearchBar";
import StandardCardTable from "src/components/StandardCardTable";
import useUser from "src/utils/lib/useUser";
import PaginationTab from "../../components/PaginationTab";

import { uploadFile, listBlobs } from "../../utils/blobStorage";
import FilePicker from "chakra-ui-file-picker";

const LibraryPage = ({ cardsFromDatabase, numPages }) => {
  const { user: currentUser } = useUser({
    redirectIfFound: false,
    redirectTo: "",
  });

  const { searchedCards, handleSearch } = useSearch(cardsFromDatabase);
  const [cards, setCards] = useState(cardsFromDatabase);
  const [isRefresehing, setIsRefreshing] = useState(false);
  const [searchString, setSearchString] = useState("");
  const [fileList, setFileList] = useState([]);

  const myRef = createRef();

  const upload = () => {
    const file = fileList[0];
    uploadFile(file.name, file, { test_metadata: "test" }).then((res) => {
      console.log(res._response.request.url);
    });
  };
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setIsRefreshing(false);
  }, [cards]);

  return isRefresehing ? (
    <Text>Loading</Text>
  ) : (
    <Flex alignItems="stretch" flexDirection="column">
      <SearchBar handleSearch={handleSearch} />
      <Heading fontSize={{ base: "4xl", lg: "5xl" }}> Library</Heading>

      <Box>
        <FilePicker
          onFileChange={(fileList) => setFileList(fileList)}
          placeholder="placeholder"
          clearButtonLabel="Clear Selected Files"
          multipleFiles={false}
          hideClearButton={false}
          ref={myRef}
        />
        <Button onClick={upload}>Upload</Button>
      </Box>
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
