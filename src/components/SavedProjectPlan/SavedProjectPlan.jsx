import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Box, Button, Flex, Heading, HStack, VStack } from "@chakra-ui/react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { useEffect, useState } from "react";
import PlanDocumentPDF from "../../components/PlanDocumentPDF/PlanDocumentPDF";
import StandardCard from "../StandardCard";

const SavedProjectPlans = ({ plan }) => {
  const [hasLoaded, setHasLoaded] = useState(false);
  const [showBackArrow, setShowBackArrow] = useState(false);
  const [showNextArrow, setShowNextArrow] = useState(false);
  const [currentCardGroup, setCurrentCardGroup] = useState([]);
  const [currentGroupIndex, setCurrentGroupIndex] = useState(0);

  useEffect(() => {
    setHasLoaded(true);

    if (plan.cards.length <= 3) {
      setCurrentCardGroup(plan.cards);
    } else {
      setCurrentCardGroup(plan.cards.slice(0, 3));
      setShowNextArrow(true);
    }
  }, [plan.cards]);

  function getNextCardGroup() {
    const nextGroupIndex = currentGroupIndex + 3;

    setShowBackArrow(true);
    setCurrentGroupIndex(nextGroupIndex);
    if (nextGroupIndex + 3 >= plan.cards.length) {
      setCurrentCardGroup(plan.cards.slice(nextGroupIndex, plan.cards.length));
      setShowNextArrow(false);
    } else {
      setCurrentCardGroup(plan.cards.slice(nextGroupIndex, nextGroupIndex + 3));
    }
  }

  function getPreviousCardGroup() {
    const prevGroupIndex = currentGroupIndex - 3;

    setShowNextArrow(true);
    setCurrentGroupIndex(prevGroupIndex);
    if (prevGroupIndex - 3 < 0) {
      setCurrentCardGroup(plan.cards.slice(0, 3));
      setShowBackArrow(false);
    } else {
      setCurrentCardGroup(plan.cards.slice(prevGroupIndex, prevGroupIndex + 3));
    }
  }

  return (
    <>
      <Box
        w="full"
        minH="md"
        p="2%"
        borderRadius={15}
        bgColor="#D9D9D9"
        mb="5%"
      >
        <VStack display="block">
          <HStack mb="3%">
            <Heading mr="15px" size="lg">
              {plan.name}
            </Heading>
            <Button
              h="30px"
              mt="3px"
              ml="30px"
              bgColor="#727474"
              borderRadius="20"
              textColor="white"
            >
              Download
            </Button>
            {hasLoaded && (
              <PDFDownloadLink
                document={<PlanDocumentPDF selectedPlanCards={plan.cards} />}
                fileName="plan.pdf"
              >
                {({ loading }) => (
                  <Button
                    h="30px"
                    bgColor="#727474"
                    borderRadius="20"
                    textColor="white"
                  >
                    {loading ? "Loading document..." : "Print to PDF"}
                  </Button>
                )}
              </PDFDownloadLink>
            )}
          </HStack>

          <HStack>
            <Box w="5%" h="5%">
              <ChevronLeftIcon
                hidden={!showBackArrow}
                onClick={getPreviousCardGroup}
                w={6}
                h={6}
              />
            </Box>
            <Flex w="90%">
              {currentCardGroup.map((card, index) => {
                return (
                  <Box
                    mr={index % 3 == 2 ? "0%" : "15%"}
                    key={index}
                    bgColor="white"
                  >
                    <StandardCard key={index} card={card} />
                  </Box>
                );
              })}
            </Flex>
            <Box w="5%" h="5%">
              <ChevronRightIcon
                hidden={!showNextArrow}
                onClick={getNextCardGroup}
                float="right"
                w={6}
                h={6}
              />
            </Box>
          </HStack>
        </VStack>
      </Box>
    </>
  );
};
export default SavedProjectPlans;
