import SearchBar from "../../components/SearchBar";
import StandardCard from "../../components/StandardCard";
import { RandomCard, SelectableCard } from "../../components/StandardCard";
import { useTextFilter } from "../../components/SearchBar";
import { useState } from "react";
import { useEffect } from "react";
import { Button } from "@chakra-ui/react";

export default function ProjectPlanBuilder() {
  const cards = [
    "Random",
    "Card",
    "Generator",
    "Would",
    "Be",
    "Pretty",
    "Nice",
    "Hell",
    "I'd",
    "Settle",
    "For",
    "Some",
    "Nice",
    "Dummy",
    "Data",
  ];
  const [selections, setSelections] = useState(Array(cards.length).fill(false));
  const selectionSetter = (index) => {
    return (selection) => {
      const newSelections = [...selections];
      newSelections[index] = selection;
      setSelections(newSelections);
    };
  };
  const [textFilter, setFilter, searchString] = useTextFilter();
  const ExportHandler = () => {
    const exportedCards = cards.filter((_, index) => selections[index]);
    console.log(exportedCards);
    alert("Exported data has been logged in console");
  };

  return (
    <>
      <SearchBar setSearchString={setFilter} />
      <Button>Export</Button>
      {cards.filter(textFilter).map((card, index) => (
        <SelectableCard
          key={index}
          setSelect={selectionSetter(index)}
          cardProps={{ title: card }}
          selected={selections[index]}
        />
      ))}
    </>
  );
}
