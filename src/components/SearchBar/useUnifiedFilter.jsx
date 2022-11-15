import { useState } from "react";

// Custom hook that returns a filter function that is based on a searchString.
// Also returns a setter function that can set the searchString.
export default function useTextFilter() {
  const [searchCriteria, setCriteria] = useState({
    searchString: "",
    tags: [],
  });
  return [
    (card) => {
      return (
        card.title
          ?.toLowerCase()
          .includes(searchCriteria.searchString.toLowerCase()) ||
        card.tags
          ?.join(" ")
          .toLowerCase()
          .includes(searchCriteria.searchString.toLowerCase()) ||
        card.tags
          .map((tag) => tag.toLowerCase())
          .every((tag) =>
            searchCriteria.tags.map((tag) => tag.toLowerCase()).includes(tag)
          )
      );
    },
    setCriteria,
    searchCriteria,
  ];
}
