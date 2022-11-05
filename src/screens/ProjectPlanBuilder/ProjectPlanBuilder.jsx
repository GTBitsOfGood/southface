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
        if (switchWith.current === null) {
          const newSelections = [...selections];
          switchWith.current = index;
          newSelections[index].mode = "switchYellow";
          setSelections(newSelections);
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
    return <StandardCard key={card.index} card={cardProps} />;
  };
  // Renders cards to appear de-selectable
  const Comparator = (a, b) => {
    const aVal = a.order !== undefined ? a.order : a.index;
    const bVal = b.order !== undefined ? b.order : b.index;
    return aVal - bVal;
  };

  const RenderSelected = (card) => {
    const cardProps = { ...card.cardProps };
    cardProps.selected = card.selection;
    cardProps.setSelection = SelectionSetter(card.index);
    cardProps.mode = (function () {
      if (isSwitching) {
        return card.order === switchWith.current
          ? "switchYellow"
          : "switchGray";
      } else {
        return "red";
      }
    })();
    return <StandardCard key={card.index} card={cardProps} />;
  };

  // Order handlers

  const [isSwitching, setSwitching] = useState(false);
  const switchWith = useRef(null);
  const Switcher = (b) => {
    const a = switchWith.current;

    const newSelections = [...selections];
    newSelections[a].order = b;
    newSelections[b].order = a;
    const temp = { ...newSelections[a] };
    temp.mode = "red";
    newSelections[a] = newSelections[b];
    newSelections[b] = temp;
    setSelections(newSelections, () => {
      switchWith.current = null;
      setSwitching(false);
    });
  };

  // DB action handlers
  const DiscardPlanHandler = () => {
    setSelections((prevSelections) => {
      return prevSelections.map((selection) => {
        const newSelection = { ...selection };
        newSelection.selection = false;
        return newSelection;
      });
    });
    onClose();
  };

  const SavePlanHandler = async () => {
    const selectedCards = selections
      .filter((card) => card.selection)
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
          Bruh
        </Button>
        <Heading flex="1" gridArea="stack" textAlign="center">
          Project Plan Builder
        </Heading>
        <Button>View Project Plans</Button>
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
            {selections.filter((card) => card.selection).map(RenderSelected)}
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
        {searchedCards.map(WrapToSelection).sort(Comparator).map(RenderCards)}
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
