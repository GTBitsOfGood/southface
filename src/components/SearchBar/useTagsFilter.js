import { useState } from "react";

// Custom hook that returns a filter function that is based on a searchString.
// Also returns a setter function that can set the searchString.
export default function useTagsFilter(tags = []) {
  const [filterTags, setFilterTags] = useState(tags);
  return [
    (card) => {
      let matches = 0;
      card.tags.every((tag) => {
        if (Object.prototype.hasOwnProperty.call(filterTags, tag)) {
          matches++;
        }
        return matches < Object.keys(filterTags).length;
      });
      return matches >= Object.keys(filterTags).length;
    },
    setFilterTags,
    filterTags,
  ];
}
