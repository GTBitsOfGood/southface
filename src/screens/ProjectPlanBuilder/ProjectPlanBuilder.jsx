import SearchBar, { useSearch } from "../../components/SearchBar";
import { SelectableCard } from "../../components/StandardCard";
import { getCards } from "../../actions/Card";
import { Button, HStack, Heading, Flex, Box, Grid } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PlanDocumentPDF from "../../components/PlanDocumentPDF/PlanDocumentPDF";
import Link from "next/link";

export default function ProjectPlanBuilder() {
  // Primary state in this page is the selections array
  const [selections, setSelections] = useState([]);
  useEffect(() => {
    getCards().then((res) => {
      setSelections(res.map(WrapToSelection));
    }); // for the love of God don't put dependency array here
  }, []);

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

  // Every wrapped card object has an index which can be used to "easily" change
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

  // Maps selection objects into renderable cards
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

  // Filtering logic
  const { searchedCards, handleSearch } = useSearch(
    selections.map(UnwrapToCard)
  );

  // For PDF exporting
  const [hasLoaded, setHasLoaded] = useState(false);
  useEffect(() => setHasLoaded(true), []);
  return (
    <>
      <Flex flexFlow="row nowrap" mb="10">
        <Button opacity="0" cursor="default">
          View Saved Project Plans
        </Button>
        <Heading flex="1" gridArea="stack" textAlign="center">
          Project Plan Builder
        </Heading>
        <Link href="/saved-project-plans">
          <Button href="/">View Saved Project Plans</Button>
        </Link>
      </Flex>
      <Flex
        p={5}
        borderRadius={15}
        flexDirection="column"
        flexWrap="none"
        bgColor="lightgray"
        alignItems="flex-start"
        minH="lg"
        overflowX="scroll"
        mb="10"
      >
        <Flex
          flex="1"
          flexFlow="row nowrap"
          justifyContent="space-between"
          width="100%"
          alignItems="flex-start"
        >
          <Heading size="lg">Current Project Plan</Heading>
          <HStack>
            <Button>Download</Button>
            {hasLoaded && (
              <PDFDownloadLink
                document={
                  <PlanDocumentPDF
                    selectedPlanCards={selections
                      .filter((card) => card.selection)
                      .map(UnwrapToCard)}
                  />
                }
                fileName="plan.pdf"
              >
                {({ blob, url, loading, error }) => (
                  <Button>{loading ? "Loading document..." : "PDF"}</Button>
                )}
              </PDFDownloadLink>
            )}
            <Button bg="gold" color="white">
              End Project Plan
            </Button>
          </HStack>
          <Button onClick={ExportHandler}>Export Selected</Button>
        </Flex>
        {selections.filter((card) => card.selection).length > 0 ? (
          <HStack mt="10" gap="41" flexDirection="row">
            {selections.filter((card) => card.selection).map(SelectionMapper)}
          </HStack>
        ) : (
          <Box alignSelf="center" flex="1" width="50%" fontSize="3xl">
            You haven’t started building a project plan yet. Browse the card
            library to begin adding to your project plan.
          </Box>
        )}
      </Flex>
      <Heading>All Cards</Heading>
      <SearchBar handleSearch={handleSearch} popUpOnLoad={true} />
      <Grid
        templateColumns="repeat(auto-fill, minmax(250px, 1fr))"
        gap="41"
        m="10"
      >
        {searchedCards.map(WrapToSelection).map(SelectionMapper)}
      </Grid>
    </>
  );
}
