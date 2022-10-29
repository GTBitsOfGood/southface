import { Flex, Button, Text } from "@chakra-ui/react";
import { useState } from "react";
import Router from "next/router";

const PaginationTab = ({ numPages, lastCardId, ...props }) => {
  const numPagesArray = [...new Array(numPages).keys()].map(
    (element) => ++element
  );
  const [currentPage, setCurrentPage] = useState(numPagesArray[0]);
  const onPageChange = (pageNumber) => {
    if (parseInt(pageNumber) === 1) {
      window.location.href = "/library";
    } else {
      window.location.href = "/library?lastCardId=" + lastCardId;
    }

    setCurrentPage(pageNumber);
  };
  return (
    <Flex rounded={6} {...props} p={2} bgColor="#004b4b">
      {numPagesArray.map((pageNumber, index) => (
        <Button
          key={index}
          variant="link"
          color="white"
          disabled={currentPage === pageNumber ? true : false}
          onClick={() => onPageChange(pageNumber)}
        >
          {pageNumber}
        </Button>
      ))}
    </Flex>
  );
};

export default PaginationTab;
// somehow get the count of documents without fetching all the cards
// then only fetch the cards based on what page you are currently on
