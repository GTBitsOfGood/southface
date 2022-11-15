import { Flex, Button } from "@chakra-ui/react";
import { getCardsPagination } from "../../actions/Card";

const PaginationTab = ({
  numPages,
  currentPage,
  setCurrentPage,
  setCards,
  setIsRefreshing,
  ...props
}) => {
  const numPagesArray = [...new Array(numPages).keys()].map(
    (element) => ++element
  );

  const onPageChange = async (pageNumber) => {
    const { cards: updatedCards } = await getCardsPagination(pageNumber);
    setCards(updatedCards);
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
