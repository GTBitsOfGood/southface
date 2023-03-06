import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { getCardsPagination } from "../../actions/Card";

export default function useSearch({ setNumPages, setCurrentPage, setCards }) {
  const router = useRouter();
  const noSearchResultsToast = useToast();
  const { buildingType, primaryCategory } = router.query;

  const calculateNumPagesToDisplay = (cardsCount) => {
    if (setNumPages) {
      let numPages = Math.floor(cardsCount / 4);
      if (cardsCount % 4 > 0) {
        numPages += 1;
      }

      setNumPages(numPages);
    }
  };

  const displayNoSearchResultToast = () => {
    noSearchResultsToast({
      title: "No Search Results!",
      description: "Your search did not match any cards.",
      status: "error",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleSearch = async ({
    searchString = "",
    tags = {},
    pageNumber = 1,
  }) => {
    const searchFilter = {
      searchString,
      tags,
      buildingType,
      primaryCategory: primaryCategory || null,
    };

    // accounts for click button on primary category page with empty string
    if (searchString === "" && primaryCategory === undefined) {
      setCards([]);
    } else {
      const { cards, cardsCount } = await getCardsPagination(
        pageNumber,
        searchFilter
      );

      calculateNumPagesToDisplay(cardsCount);
      setCurrentPage(pageNumber);
      setCards(cards);

      // shows toast on primary category page if search result not found
      if (cards.length === 0 && primaryCategory == undefined) {
        displayNoSearchResultToast();
      }
    }
  };

  return { handleSearch };
}
