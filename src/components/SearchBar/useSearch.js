// const { searchedCards, setSearch } = useSearch(cards);
// return <SearchBar setSearch={setSearch} />
// {
// searchedCards.map()}

import { useState, useEffect } from "react";
import { getCardsCount } from "../../../server/mongodb/actions/Card";
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
    const fetchCards = async () => {
      const {cards, cardsCount} = await getCardsPagination(1, criteria.searchString);

      let numPages = Math.floor(cardsCount / 4);
      if (cardsCount % 4 > 0) {
        numPages += 1;
      }
      console.log(numPages)

      setNumPages(numPages);
      setCurrentPage(1);
      setCards(cards)
    };
    fetchCards();
  }, [criteria]);

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

  console.log(criteria);
  const searchedCards = cards.filter(filter);
  const nonSearchedCards = cards.filter((card) => !filter(card));
  const handleSearch = {
    setSearch: setSearch,
    criteria: criteria,
  };
  return { searchedCards, handleSearch, nonSearchedCards };
}
