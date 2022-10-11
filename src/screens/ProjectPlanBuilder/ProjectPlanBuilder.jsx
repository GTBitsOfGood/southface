import SearchBar, { useTagsFilter } from "../../components/SearchBar";
import { SelectableCard } from "../../components/StandardCard";
import { useTextFilter, useTagFilter } from "../../components/SearchBar";
import { useState } from "react";
import { Button, HStack } from "@chakra-ui/react";
import { getCards } from "../../actions/Card";
import { useEffect } from "react";
import { Heading, Flex, Box } from "@chakra-ui/react";

export default function ProjectPlanBuilder() {
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
    }); // for the love of God don't put dependency array here
  }, []);

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
  const [tagsFilter, setTags, filterTags] = useTagsFilter();

  return (
    <>
      <Heading textAlign="center">Project Plan Builder</Heading>
      <SearchBar
        setSearchString={setFilter}
        setFilterTags={setTags}
        filterTags={filterTags}
      />
      <Flex
        p={5}
        borderRadius={15}
        flexDirection="column"
        flexWrap="none"
        bgColor="lightgray"
        alignItems="flex-start"
        minH="lg"
      >
        <HStack>
          <Heading size="lg">Current Project Plan</Heading>
          <Button onClick={ExportHandler}>Export Selected</Button>
        </HStack>
        {selections.filter((card) => card.selection).length > 0 ? (
          <Flex flexDirection="row">
            {selections.filter((card) => card.selection).map(SelectionMapper)}
          </Flex>
        ) : (
          <Box alignSelf="center" width="50%" fontSize="3xl">
            You haven’t started building a project plan yet. Browse the card
            library to begin adding to your project plan.
          </Box>
        )}
      </Flex>
      <Heading>All Cards</Heading>
      <Flex flexDirection="row">
        {selections
          .filter((card) => textFilter(card.cardProps))
          .filter((card) => tagsFilter(card.cardProps))
          .map(SelectionMapper)}
      </Flex>
    </>
  );
}
