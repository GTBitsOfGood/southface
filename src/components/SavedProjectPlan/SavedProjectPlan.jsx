import { getCards } from "../../actions/Card";
import Link from "next/link";
import { Button, HStack, Heading, Flex, Box, VStack } from "@chakra-ui/react";
import { ChevronRightIcon, ChevronLeftIcon } from "@chakra-ui/icons";
import { useState, useEffect } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PlanDocumentPDF from "../../components/PlanDocumentPDF/PlanDocumentPDF";
import StandardCard from "../StandardCard";

const SavedProjectPlans = () => {
  const [hasLoaded, setHasLoaded] = useState(false);
  const [showBackArrow, setShowBackArrow] = useState(false);
  const [showNextArrow, setShowNextArrow] = useState(false);
  const [cards, setCards] = useState([]);
  const [currentCardGroup, setCurrentCardGroup] = useState([]);
  const [currentGroupIndex, setCurrentGroupIndex] = useState(0);

  useEffect(() => {
    setHasLoaded(true);
    getCards().then((res) => {
      console.log(cards);
      setCards(res);
      console.log(res);
      if (res.length <= 3) {
        setCurrentCardGroup(res);
      } else {
        setCurrentCardGroup(res.slice(0, 3));
        setShowNextArrow(true);
      }
    });
  }, []);

  function getNextCardGroup() {
    const nextGroupIndex = currentGroupIndex + 3;

    setShowBackArrow(true);
    setCurrentGroupIndex(nextGroupIndex);
    if (nextGroupIndex + 3 >= cards.length) {
      setCurrentCardGroup(cards.slice(nextGroupIndex, cards.length));
      setShowNextArrow(false);
    } else {
      setCurrentCardGroup(cards.slice(nextGroupIndex, nextGroupIndex + 3));
    }
  }

  function getPreviousCardGroup() {
    const prevGroupIndex = currentGroupIndex - 3;

    setShowNextArrow(true);
    setCurrentGroupIndex(prevGroupIndex);
    if (prevGroupIndex - 3 < 0) {
      setCurrentCardGroup(cards.slice(0, 3));
      setShowBackArrow(false);
    } else {
      setCurrentCardGroup(cards.slice(prevGroupIndex, prevGroupIndex + 3));
    }
  }

  return (
    <>
      <Box
        w="full"
        minH="md"
        p="2%"
        borderRadius={15}
        bgColor="lightgray"
        mb="30px"
      >
        <VStack display="block">
          <HStack mb="25px">
            <Heading size="lg"> Project Plan</Heading>
            <Button
              h="30px"
              mt="3px"
              ml="30px"
              bgColor="darkGray"
              borderRadius="20"
              textColor="white"
            >
              Download
            </Button>
            {/* {hasLoaded && (
              <PDFDownloadLink
                document={<PlanDocumentPDF selectedPlanCards={plan.cards} />}
                fileName="plan.pdf"
              >
                {({ blob, url, loading, error }) => (
                  <Button>{loading ? "Loading document..." : "PDF"}</Button>
                )}
              </PDFDownloadLink>
            )} */}
            <Button
              h="30px"
              mt="3px"
              bgColor="darkGray"
              borderRadius="20"
              textColor="white"
            >
              Print to PDF
            </Button>
          </HStack>
          <HStack spacing="10%">
            {showBackArrow && (
              <ChevronLeftIcon onClick={getPreviousCardGroup} w={6} h={6} />
            )}
            {currentCardGroup.map((card, index) => {
              return <StandardCard key={index} card={card} />;
            })}
            {showNextArrow && (
              <ChevronRightIcon onClick={getNextCardGroup} w={6} h={6} />
            )}
          </HStack>
        </VStack>
      </Box>
    </>
  );
};
export default SavedProjectPlans;
