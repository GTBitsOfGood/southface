import { getCardsPagination } from "../../actions/Card";

export default function useSearch(
  cards,
  setNumPages,
  setCurrentPage,
  setCards,
  buildingType,
  primaryCategory = null
) {
  const handleSearch = (input) => {
    console.log("handleSearch triggered");

    const searchFilter = {
      searchString: input,
      tags: {},
      buildingType: buildingType,
      primaryCategory: primaryCategory,
    };

    console.log("searchFilter: ", searchFilter);

    getCardsPagination(1, searchFilter).then(({ cards, cardsCount }) => {
      console.log("getCardsPagination response received");
      let numPages = Math.floor(cardsCount / 4);
      if (cardsCount % 4 > 0) {
        numPages += 1;
      }
      console.log("numPages: ", numPages);

      if (setNumPages) {
        setNumPages(numPages);
        setCurrentPage(1);
        setCards(cards);
      }
    });
  };

  return { handleSearch };
}
