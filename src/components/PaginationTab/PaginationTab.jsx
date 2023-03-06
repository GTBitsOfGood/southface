import { Button, Flex } from "@chakra-ui/react";
import useSearch from "../SearchBar/useSearch";

const PaginationTab = ({
  numPages,
  currentPage,
  setCurrentPage,
  setCards,
  ...props
}) => {
  const numPagesArray = [...new Array(numPages).keys()].map(
    (element) => ++element
  );

  const { handleSearch: onPageChange } = useSearch({
    setCurrentPage,
    setCards,
  });
  
  return numPages > 0 && (
    <Flex rounded={6} {...props} p={2} bgColor="#004b4b">
      {numPagesArray.map((pageNumber, index) => (
        <Button
          key={index}
          variant="link"
          color="white"
          isDisabled={currentPage === pageNumber ? true : false}
          onClick={() => onPageChange({pageNumber})}
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
