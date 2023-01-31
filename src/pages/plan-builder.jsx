import {
  Button,
  Card,
  CardBody,
  Flex,
  // Grid,
  Heading,
  HStack,
  Input,
  StackDivider,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { PDFDownloadLink } from "@react-pdf/renderer";
// import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { getCards } from "src/actions/Card";
import { createPlan } from "src/actions/Plan";
import PlanConfirmationModal from "src/components/Modals/PlanConfirmationModal";
import PlanDocumentPDF from "src/components/PlanDocumentPDF/PlanDocumentPDF";
// import SearchBar, { useSearch } from "src/components/SearchBar";
// import StandardCard from "src/components/StandardCard";
import useUser from "src/lib/hooks/useUser";
// import StandardCard from "../components/StandardCard/StandardCard";

const ProjectPlanBuilder = () => {
  // Primary state in this page is the selections array
  const [selections, setSelections] = useState([]);
  const [cards, setCards] = useState([]);
  useEffect(() => {
    getCards().then((res) => {
      console.log(cards);
      setCards(res);
    });
    // for the love of God don't put dependency array here
  }, []);

  // Wraps cards with selection info
  // const WrapToSelection = (card, index) => {
  //   return {
  //     cardProps: card,
  //     index: card.selectionIndex ? card.selectionIndex : index,
  //     order: card.order ? card.order : index,
  //     selection: card.selected,
  //   };
  // };
  const UnwrapToCard = (card) => {
    const cardProps = { ...card.cardProps };
    cardProps.selected = card.selection;
    cardProps.setSelection = card.setSelection;
    cardProps.selectionIndex = card.index;
    return cardProps;
  };

  // Every wrapped card object has an index which can be used to "easily" change
  // state in this component from a <SelectableCard /> child component
  // const SelectionSetter = (index) => {
  //   return (selection) => {
  //     if (isSwitching) {
  //       if (switchWith === null) {
  //         setSwitchWith(index);
  //       } else {
  //         Switcher(index);
  //       }
  //     } else {
  //       const newSelections = [...selections];
  //       newSelections[index].selection = selection;
  //       setSelections(newSelections);
  //     }
  //   };
  // };

  // Array map methods for rendering
  // const RenderCards = (card) => {
  //   const cardProps = { ...card.cardProps };
  //   cardProps.selected = card.selection;
  //   cardProps.setSelection = SelectionSetter(card.index);
  //   cardProps.selectable = true;
  //   return <StandardCard key={card.index} card={cardProps} />;
  // };

  const Comparator = (a, b) => a.order - b.order;

  // const RenderSelected = (card) => {
  //   const cardProps = { ...card.cardProps };
  //   cardProps.selected = card.selection;
  //   cardProps.setSelection = SelectionSetter(card.index);
  //   cardProps.selectable = true;
  //   cardProps.mode = (function () {
  //     if (isSwitching) {
  //       return card.index === switchWith ? "switchYellow" : "switchGray";
  //     } else {
  //       return "red";
  //     }
  //   })();
  //   return <StandardCard key={card.index} card={cardProps} />;
  // };

  // Order handlers
  // const [isSwitching, setSwitching] = useState(false);
  // useEffect(() => {
  //   if (!isSwitching) {
  //     setSwitchWith(null);
  //   }
  // }, [isSwitching]);
  // const [switchWith, setSwitchWith] = useState(null);
  // const Switcher = (b) => {
  //   const a = switchWith;
  //   console.log(
  //     `Before: a is ${selections[a].order} and b is ${selections[b].order}`
  //   );
  //   const newSelections = [...selections];
  //   const temp = newSelections[a].order;
  //   newSelections[a].order = newSelections[b].order;
  //   newSelections[b].order = temp;

  //   setSelections(() => {
  //     setSwitching(false);
  //     return newSelections;
  //   });
  //   console.log(
  //     `After: a is ${newSelections[a].order} and b is ${newSelections[b].order}`
  //   );
  // };

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
      userId: user.id,
    });
    onClose();
  };

  // Search logic
  // const { searchedCards, handleSearch } = useSearch(
  //   selections.map(UnwrapToCard)
  // );

  // For PDF exporting
  const [hasLoaded, setHasLoaded] = useState(false);
  useEffect(() => setHasLoaded(true), []);

  // Confimation modal
  const { isOpen, onOpen, onClose } = useDisclosure();
  const nameRef = useRef();
  const { user } = useUser();

  return (
    <>
      <HStack alignItems="flex-start" spacing={3}>
        <VStack
          flex={2}
          as={Card}
          alignItems="flex-start"
          p={6}
          spacing={5}
          divider={<StackDivider />}
        >
          <CardBody m={-3} w="100%">
            <Flex mb={3} width="100%" flexFlow="row nowrap">
              <HStack w="100%" alignItems="flex-start">
                {hasLoaded ? ( // temp placeholder condition
                  <Heading maxW="80%" mr={3}>
                    Title of Current Project Plan
                  </Heading>
                ) : (
                  <Input
                    size="lg"
                    maxW="50%"
                    fontSize="3xl"
                    variant="flushed"
                    mr={3}
                    placeholder="Title of Current Project Plan"
                    ref={nameRef}
                  />
                )}
                <Button>Rename</Button>
              </HStack>
              <Button onClick={onOpen} bg="gold" color="white">
                End Project Plan
              </Button>
            </Flex>
            <HStack>
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
                  {({ loading }) => (
                    <Button>
                      {loading
                        ? "Loading document..."
                        : "PDF (Jk also download for now lol)"}
                    </Button>
                  )}
                </PDFDownloadLink>
              )}
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
                  {({ loading }) => (
                    <Button>
                      {loading ? "Loading document..." : "Download"}
                    </Button>
                  )}
                </PDFDownloadLink>
              )}
            </HStack>
          </CardBody>
        </VStack>
        <VStack flex={1}>
          <Card w="100%">
            <Heading size="lg" p={5}>
              Saved Project Plans
            </Heading>
          </Card>
          <Card w="100%">
            <Heading size="lg" p={5}>
              Recent Standards
            </Heading>
          </Card>
        </VStack>
      </HStack>
      {/* <Flex flexFlow="row nowrap" mb="10">
        <Link href="/saved-project-plans">
          <Button href="/">View Saved Project Plans</Button>
        </Link>
      </Flex> */}
      {/* <Flex
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
          <HStack>
            <Button
              bgColor={isSwitching ? "gold" : "default"}
              color={isSwitching ? "white" : "default"}
              onClick={() => setSwitching(!isSwitching)}
            >
              {isSwitching ? "Finish reordering" : "Reorder cards"}
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
      </Flex> */}
      <PlanConfirmationModal
        isOpen={isOpen}
        onClose={onClose}
        handleSave={SavePlanHandler}
        handleDiscard={DiscardPlanHandler}
      />
    </>
  );
};

export default ProjectPlanBuilder;
