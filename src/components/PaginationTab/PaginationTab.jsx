import { Button, Flex } from "@chakra-ui/react";
import useSearch from "src/lib/hooks/useSearch";

const PaginationTab = ({
  numPages,
  currentPage,
  setCurrentPage,
  setCards,
}) => {
  const numPagesArray = [...new Array(numPages).keys()].map(
    (element) => ++element
  );

  const { handleSearch: onPageChange } = useSearch({
    setCurrentPage,
    setCards,
  });

  return (
    numPages > 1 && (
      <Flex
        rounded={6}
        alignSelf="center"
        p={2}
        bgColor="Blue"
      >
        {numPagesArray.map((pageNumber, index) => (
          <Button
            key={index}
            variant="link"
            color="white"
            
            isDisabled={currentPage === pageNumber ? true : false}
            onClick={() => onPageChange({ pageNumber })}
          >
            {pageNumber}
          </Button>
        ))}
      </Flex>
    )
  );
};

export default PaginationTab;
// somehow get the count of documents without fetching all the cards
// then only fetch the cards based on what page you are currently on
