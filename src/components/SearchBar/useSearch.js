// const { searchedCards, setSearch } = useSearch(cards);
// return <SearchBar setSearch={setSearch} />
// {
// searchedCards.map()}

import { useState } from "react";

export default function useSearch(cards) {
  const [criteria, setSearch] = useState({
    searchString: "",
    tags: {},
  });
  const filter = (card) => {
    const matchesSearch =
      card.title?.toLowerCase().includes(criteria.searchString.toLowerCase()) ||
      card.body?.toLowerCase().includes(criteria.searchString.toLowerCase());
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
