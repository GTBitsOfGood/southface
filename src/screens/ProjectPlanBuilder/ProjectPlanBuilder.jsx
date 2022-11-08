import SearchBar, { useSearch } from "../../components/SearchBar";
import StandardCard from "../../components/StandardCard";
import { getCards } from "../../actions/Card";
import {
  Button,
  HStack,
  Heading,
  Flex,
  Box,
  Grid,
  useDisclosure,
  Input,
} from "@chakra-ui/react";
import { useState, useEffect, useRef } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PlanDocumentPDF from "../../components/PlanDocumentPDF/PlanDocumentPDF";
import { createPlan } from "../../actions/Plan";
import PlanConfirmationModal from "../../components/Modals/PlanConfirmationModal";
import { EditIcon, Icon } from "@chakra-ui/icons";
import useUser from "../../utils/lib/useUser";
import Link from "next/link";

export default function ProjectPlanBuilder() {
  // Primary state in this page is the selections array
  const [selections, setSelections] = useState([]);
  useEffect(() => {
    getCards().then((res) => {
      setSelections(res.map(WrapToSelection));
    }); // for the love of God don't put dependency array here
  }, []);

  // Wraps cards with selection info
  const WrapToSelection = (card, index) => {
    return {
      cardProps: card,
      index: card.selectionIndex ? card.selectionIndex : index,
      order: card.order ? card.order : index,
      selection: card.selected,
    };
  };
  const UnwrapToCard = (card) => {
    const cardProps = { ...card.cardProps };
    cardProps.selected = card.selection;
    cardProps.setSelection = card.setSelection;
    cardProps.selectionIndex = card.index;
    return cardProps;
  };

  // Every wrapped card object has an index which can be used to "easily" change
  // state in this component from a <SelectableCard /> child component
  const SelectionSetter = (index) => {
    return (selection) => {
      if (isSwitching) {
        if (switchWith === null) {
          setSwitchWith(index);
        } else {
          Switcher(index);
        }
      } else {
        const newSelections = [...selections];
        newSelections[index].selection = selection;
        setSelections(newSelections);
      }
    };
  };

  // Array map methods for rendering
  const RenderCards = (card) => {
    const cardProps = { ...card.cardProps };
    cardProps.selected = card.selection;
    cardProps.setSelection = SelectionSetter(card.index);
    cardProps.selectable = true;
    return <StandardCard key={card.index} card={cardProps} />;
  };

  const Comparator = (a, b) => a.order - b.order;

  const RenderSelected = (card) => {
    const cardProps = { ...card.cardProps };
    cardProps.selected = card.selection;
    cardProps.setSelection = SelectionSetter(card.index);
    cardProps.selectable = true;
    cardProps.mode = (function () {
      if (isSwitching) {
        return card.index === switchWith ? "switchYellow" : "switchGray";
      } else {
        return "red";
      }
    })();
    return <StandardCard key={card.index} card={cardProps} />;
  };

  // Order handlers

  const [isSwitching, setSwitching] = useState(false);
  useEffect(() => {
    if (!isSwitching) {
      setSwitchWith(null);
    }
  }, [isSwitching]);
  const [switchWith, setSwitchWith] = useState(null);
  const Switcher = (b) => {
    const a = switchWith;
    console.log(
      `Before: a is ${selections[a].order} and b is ${selections[b].order}`
    );
    const newSelections = [...selections];
    const temp = newSelections[a].order;
    newSelections[a].order = newSelections[b].order;
    newSelections[b].order = temp;
    // for (let i = Math.max(a, b) + 1; i < l; i++) {
    //   newSelections[i].order = newSelections[i].order + 1;
    // }
    setSelections(() => {
      setSwitching(false);
      return newSelections;
    });
    console.log(
      `After: a is ${newSelections[a].order} and b is ${newSelections[b].order}`
    );
  };

  // DB action handlers
  const DiscardPlanHandler = () => {
    setSelections((prevSelections) => {
      return prevSelections.map((selection, order) => {
        const newSelection = { ...selection };
        newSelection.selection = false;
        newSelection.order = order;
        return newSelection;
      });
    });
    onClose();
  };

  const SavePlanHandler = async () => {
    const selectedCards = [...selections]
      .filter((card) => card.selection)
      .sort(Comparator)
      .map(UnwrapToCard);
    await createPlan({
      cards: selectedCards,
      name: nameRef.current.value,
      userId: user._id,
    });
    onClose();
  };

  // Search logic
  const { searchedCards, handleSearch } = useSearch(
    selections.map(UnwrapToCard)
  );

  // For PDF exporting
  const [hasLoaded, setHasLoaded] = useState(false);
  useEffect(() => setHasLoaded(true), []);

  // Confimation modal
  const { isOpen, onOpen, onClose } = useDisclosure();
  const nameRef = useRef();
  const { user } = useUser();

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
        bgColor="#DADADA"
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
          <Box minWidth="40%" as="span">
            <Input
              type="text"
              placeholder="Name your project plan"
              fontSize="3xl"
              variant="flushed"
              mt="3"
              pb="3"
              borderBottomWidth="3px"
              borderColor="darkgray"
              ref={nameRef}
            />
          </Box>
          <HStack>
            <Button
              bgColor={isSwitching ? "gold" : "default"}
              color={isSwitching ? "white" : "default"}
              onClick={() => setSwitching(!isSwitching)}
            >
              {isSwitching ? "Finish reordering" : "Reorder cards"}
            </Button>
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
            <Button onClick={onOpen} bg="gold" color="white">
              End Project Plan
            </Button>
          </HStack>
        </Flex>
        {selections.filter((card) => card.selection).length > 0 ? (
          <HStack mt="10" gap="41" flexDirection="row">
            {[...selections]
              .filter((card) => card.selection)
              .sort(Comparator)
              .map(RenderSelected)}
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
        {searchedCards.map(WrapToSelection).map(RenderCards)}
      </Grid>
      <PlanConfirmationModal
        isOpen={isOpen}
        onClose={onClose}
        handleSave={SavePlanHandler}
        handleDiscard={DiscardPlanHandler}
      />
    </>
  );
}
