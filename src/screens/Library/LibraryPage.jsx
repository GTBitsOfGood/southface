import { useState, createRef } from "react";
import { Heading, Box, Button } from "@chakra-ui/react";
import SearchBar from "../../components/SearchBar";
import StandardCardTable from "src/components/StandardCardTable";
import useUser from "src/utils/lib/useUser";

import { useEffect } from "react";
import { uploadFile, listBlobs } from "../../utils/blobStorage";
import FilePicker from "chakra-ui-file-picker";

const LibraryPage = ({ cards }) => {
  const { user: currentUser } = useUser({
    redirectIfFound: false,
    redirectTo: "",
  });

  const [searchString, setSearchString] = useState("");
  const [fileList, setFileList] = useState([]);

  const myRef = createRef();

  const upload = () => {
    const file = fileList[0];
    uploadFile(file.name, file, { test_metadata: "test" });
  };

  return (
    <>
      <SearchBar setSearchString={setSearchString} />
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
    </>
  );
};

export default LibraryPage;
