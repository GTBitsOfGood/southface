import { useEffect, useState } from "react";
import { getCardsPagination } from "../../actions/Card";

export default function useSearch(
  cards,
  setNumPages,
  setCurrentPage,
  setCards,
  buildingType,
  primaryCategory = null
) {
  const [criteria, setSearch] = useState({
    searchString: "",
    tags: {},
  });

  useEffect(() => {
    console.log("useSearch useEffect triggered");
    const searchFilter = {
      searchString: criteria.searchString,
      tags: criteria.tags,
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
  }, [
    criteria,
    setNumPages,
    setCurrentPage,
    setCards,
    buildingType,
    primaryCategory,
  ]);

  const filter = (card) => {
    const matchesSearch = card.title
      ?.toLowerCase()
      .includes(criteria.searchString.toLowerCase());
    const matchesTags =
      card.tags
        .map((tag) => tag.toLowerCase())
        .every((tag) =>
          Object.keys(criteria.tags)
            .map((tag) => tag.toLowerCase())
            .includes(tag)
        ) || Object.keys(criteria.tags).length === 0;
    const matchesBuildingType =
      !buildingType || card.buildingType === buildingType;
    const matchesPrimaryCategory =
      !primaryCategory || card.primaryCategory === primaryCategory;
    return (
      matchesSearch &&
      matchesTags &&
      matchesBuildingType &&
      matchesPrimaryCategory
    );
  };

  const searchedCards = cards.filter(filter);
  const nonSearchedCards = cards.filter((card) => !filter(card));
  const handleSearch = {
    setSearch: setSearch,
    criteria: criteria,
  };
  return { searchedCards, handleSearch, nonSearchedCards };
}
