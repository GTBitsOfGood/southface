import SearchBar from "../../components/SearchBar";
import { SelectableCard } from "../../components/StandardCard";
import { useTextFilter } from "../../components/SearchBar";
import { useRef, useState } from "react";
import { Button } from "@chakra-ui/react";
import { getCards, createCard } from "../../actions/Card";
import { useEffect } from "react";
import { Heading } from "@chakra-ui/react";

export default function ProjectPlanBuilder({ ssrCards }) {
  // const cards = [
  //   "Random",
  //   "Card",
  //   "Generator",
  //   "Would",
  //   "Be",
  //   "Pretty",
  //   "Nice",
  //   "Hell",
  //   "I'd",
  //   "Settle",
  //   "For",
  //   "Some",
  //   "Nice",
  //   "Dummy",
  //   "Data",
  // ];
  // const cards = ssrCards;

  // Wraps card object with additional properties for setting selection
  // and vice-versa
  const WrapToSelection = (card, index) => {
    return {
      cardProps: card,
      index: index,
      selection: false,
    };
  };
  const UnwrapToCard = (card) => card.cardProps;

  // Primary state in this page is the selections array
  const [selections, setSelections] = useState([]);
  useEffect(() => {
    getCards().then((res) => {
      setSelections(res.map(WrapToSelection));
    }, []);
    // setSelections(ssrCards.map(WrapToSelection));
  });

  // Every wrapped card object has an index which can be used to easily change
  // state in this component from a <SelectableCard /> child component
  const SelectionSetter = (index) => {
    return (selection) => {
      const newSelections = [...selections];
      newSelections[index].selection = selection;
      setSelections(newSelections);
    };
  };

  // Handles export logic
  const ExportHandler = () => {
    const exportedCards = selections
      .filter((card) => card.selection)
      .map(UnwrapToCard);
    console.log(exportedCards);
    // exportedCards.forEach(async (card) => {
    //   await createCard(card);
    //   console.log("Created " + card);
    // });
    alert("Exported data has been logged in console");
  };
  const SelectionMapper = (card) => {
    return (
      <SelectableCard
        key={card.index}
        setSelect={SelectionSetter(card.index)}
        cardProps={card.cardProps}
        selected={card.selection}
      />
    );
  };
  const [textFilter, setFilter] = useTextFilter();

  return (
    <>
      <SearchBar setSearchString={setFilter} />
      <Heading>Selected Cards</Heading>
      <Button onClick={ExportHandler}>Export Selected</Button>
      <Heading>All Cards</Heading>
      {selections
        .map(UnwrapToCard)
        .filter(textFilter)
        .map(WrapToSelection)
        .map(SelectionMapper)}
    </>
  );
}
export async function getServerSideProps() {
  const ssrCards = await getCards();
  console.log("proof of successful SS API call:");
  console.log(ssrCards);
  return { props: { ssrCards } };
}
