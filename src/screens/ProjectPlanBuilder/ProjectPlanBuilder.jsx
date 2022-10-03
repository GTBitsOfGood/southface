import SearchBar from "../../components/SearchBar";
import { SelectableCard } from "../../components/StandardCard";
import { useTextFilter } from "../../components/SearchBar";
import { useRef, useState } from "react";
import { Button } from "@chakra-ui/react";
import { getCards, createCard } from "../../actions/Card";
import { useEffect } from "react";
import { Heading } from "@chakra-ui/react";

export default function ProjectPlanBuilder({ ssrCards }) {
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
  // const cards = ssrCards
  useEffect(() => {
    getCards().then((res) => {
      console.log("Proof of successful api call: ");
      console.log(res);
    });
  }, []);
  const [selections, setSelections] = useState(Array(cards.length).fill(false));
  const selectionSetter = (index) => {
    return (selection) => {
      const newSelections = [...selections];
      newSelections[index] = selection;
      setSelections(newSelections);
    };
  };
  const ExportHandler = () => {
    const exportedCards = cards.filter((_, index) => selections[index]);
    console.log(exportedCards);
    exportedCards.forEach(async (card) => {
      await createCard(card);
      console.log("Created " + card);
    });
    alert("Exported data has been logged in console");
  };
  const CardMapper = (card, index) => {
    const cardProps = typeof card === "string" ? { title: card } : card;
    return (
      <SelectableCard
        key={index}
        setSelect={selectionSetter(index)}
        cardProps={cardProps}
        selected={selections[index]}
      />
    );
  };
  const [textFilter, setFilter] = useTextFilter();

  return (
    <>
      <SearchBar setSearchString={setFilter} />
      <Heading>Selected Cards</Heading>
      {cards.map(CardMapper).filter((_, index) => selections[index])}
      <Button onClick={ExportHandler}>Export Selected</Button>
      <Heading>All Cards</Heading>
      {
        cards.filter(textFilter).map(CardMapper)
        /* .filter((_, index) => !selections[index]) */ // this line messes with searchability; requires restructuring selection logic :(
      }
    </>
  );
}

export async function getServerSideProps() {
  const ssrCards = await getCards();
  console.log("proof of successful SS API call:");
  console.log(ssrCards);
  return { props: { ssrCards } };
}
