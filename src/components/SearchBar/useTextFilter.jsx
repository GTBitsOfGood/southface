import { useState } from "react";

// Custom hook that returns a filter function that is based on a searchString.
// Also returns a setter function that can set the searchString.
export default function useTextFilter() {
  const [searchString, setSearchString] = useState("");
  return [
    (card) => {
      return (
        card.title?.toLowerCase().includes(searchString.toLowerCase()) ||
        card.tags?.join(" ").toLowerCase().includes(searchString.toLowerCase())
      );
    },
    setSearchString,
    searchString,
  ];
}
