import { useEffect, useState } from "react";
import { getCardsPagination } from "../../actions/Card";

export default function useSearch(
  cards,
  setNumPages,
  setCurrentPage,
  setCards
) {
  const [criteria, setSearch] = useState({
    searchString: "",
    tags: {},
  });

  useEffect(() => {
    getCardsPagination(1, criteria).then(({ cards, cardsCount }) => {
      let numPages = Math.floor(cardsCount / 4);
      if (cardsCount % 4 > 0) {
        numPages += 1;
      }
      if (setNumPages) {
        setNumPages(numPages);
        setCurrentPage(1);
        setCards(cards);
      }
    });
  }, [criteria, setNumPages, setCurrentPage, setCards]);

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
    return matchesSearch && matchesTags;
  };

  const searchedCards = cards.filter(filter);
  const nonSearchedCards = cards.filter((card) => !filter(card));
  const handleSearch = {
    setSearch: setSearch,
    criteria: criteria,
  };
  return { searchedCards, handleSearch, nonSearchedCards };
}
