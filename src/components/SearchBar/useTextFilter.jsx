import { useState } from "react";

// Custom hook that returns a filter function that is based on a searchString.
// Also returns a setter function that can set the searchString.
export default function useTextFilter() {
  const [searchString, setSearchString] = useState("");
  return [
    (card) => {
      if (typeof card === "string" || card instanceof String) {
        return card.toLowerCase().includes(searchString.toLowerCase());
      } else {
        return (
          card.title.toLowerCase().includes(searchString.toLowerCase()) ||
          card.body.toLowerCase().includes(searchString.toLowerCase()) ||
          card.tags.toLowerCase().join(" ").includes(searchString.toLowerCase())
        );
      }
    },
    setSearchString,
    searchString,
  ];
}
