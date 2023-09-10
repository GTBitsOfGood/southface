import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { getCardsPagination } from "../../actions/Card";

export default function useSearch({ setNumPages, setCurrentPage, setCards }) {
  const router = useRouter();
  const noSearchResultsToast = useToast();
  const { buildingType, primaryCategory } = router.query;

  const [searchString, setSearchString] = useState("");
  const [tags, setTags] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);

  const [resetSearch, setResetSearch] = useState(false);
  const [tagToClear, setTagToClear] = useState();

  const calculateNumPagesToDisplay = (cardsCount) => {
    if (setNumPages) {
      let numPages = Math.floor(cardsCount / 6);
      if (cardsCount % 6 > 0) {
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
    tags = [],
    pageNumber = 1,
  }) => {
    const searchFilter = {
      searchString,
      tags,
      buildingType,
      primaryCategory: primaryCategory || null,
    };

    // accounts for click button on primary category page with empty string
    if (
      searchString === "" &&
      tags.length == 0 &&
      primaryCategory === undefined
    ) {
      setCards([]);
    } else {
      const { cards, cardsCount } = await getCardsPagination(
        pageNumber,
        searchFilter
      );

      const sortedCards = cards.slice().sort((card1, card2) => {
        return card1.title.localeCompare(card2.title);
      });

      calculateNumPagesToDisplay(cardsCount);
      setCurrentPage(pageNumber);
      setCards(sortedCards);

      // shows toast on primary category page if search result not found
      if (cards.length === 0 && primaryCategory == undefined) {
        displayNoSearchResultToast();
      }
    }

    setSearchString(searchString);
    setTags(tags);
    setPageNumber(pageNumber);
  };

  return {
    handleSearch,
    searchString,
    tags,
    pageNumber,
    resetSearch,
    setResetSearch,
    tagToClear,
    setTagToClear,
  };
}
