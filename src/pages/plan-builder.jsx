import {
  Button,
  Card,
  CardBody,
  Flex,
  Heading,
  HStack,
  Input,
  StackDivider,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
// import { PDFDownloadLink } from "@react-pdf/renderer";
// import Link from "next/link";
// import PlanDocumentPDF from "src/components/PlanDocumentPDF/PlanDocumentPDF";
// import StandardCard from "src/components/StandardCard";
// import StandardCard from "../components/StandardCard/StandardCard";
import { useEffect, useRef, useState } from "react";
// import { getCards } from "src/actions/Card";
import PlanConfirmationModal from "src/components/Modals/PlanConfirmationModal";
import { ProjectPlanStandard } from "../components/StandardCard/ProjectPlanStandard";
import useActivePlan from "../lib/hooks/useAcivePlan";

const ProjectPlanBuilder = () => {
  // const { user } = useUser();
  // const [plan, setPlan] = useState({});
  // useEffect(() => {
  //   if (user) {
  //     getActivePlan(user.id).then((res) => {
  //       setPlan(res);
  //     });
  //   }
  // }, [user]);
  const { plan, isValidating } = useActivePlan();
  useEffect(() => {
    console.log("Plan cache update");
    console.table(plan);
  }, [plan])

  // For PDF exporting
  const [hasLoaded, setHasLoaded] = useState(false);
  useEffect(() => setHasLoaded(true), []);

  // Confimation modal
  const { isOpen, onOpen, onClose } = useDisclosure();
  const nameRef = useRef();

  const standardMapper = (card, index) => {
    return <ProjectPlanStandard card={card} key={index} />;
  };

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
              <Button>Broken Download</Button>
              <Button>Broken PDF</Button>
            </HStack>
          </CardBody>
          {!isValidating && plan.cards.map(standardMapper)}
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
      <PlanConfirmationModal
        isOpen={isOpen}
        onClose={onClose}
        // handleSave={SavePlanHandler}
        // handleDiscard={DiscardPlanHandler}
      />
    </>
  );
};

export default ProjectPlanBuilder;
