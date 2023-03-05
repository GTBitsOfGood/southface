import {
  Button,
  Card,
  CardBody,
  Flex,
  Heading,
  HStack,
  Input,
  StackDivider,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import RecentStandardsView from "../components/RecentStandardsView";
import { ReportStandard } from "../components/StandardCard";
import useActiveReport from "../lib/hooks/useActiveReport";

const ReportBuilder = () => {
  // For PDF exporting
  const [editingTitle, setEditingTitle] = useState(false);
  useEffect(() => setEditingTitle(true), []);

  const nameRef = useRef();

  const { report, isValidating } = useActiveReport();
  const [sels, setSels] = useState([])
  useEffect(() => {
    if (report && !isValidating) {
      setSels(
      report.cards.map((cardWrapper, index) => (
        <CardBody key={index}>
          <ReportStandard card={cardWrapper.card} selState={cardWrapper} />
        </CardBody>
      )))
    }
            
  }, [isValidating])

  return (
    <>
      <HStack pt={5} alignItems="flex-start" spacing={3}>
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
                {editingTitle ? ( // temp placeholder condition
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
              <Button bg="gold" color="white">
                End Project Plan
              </Button>
            </Flex>
          </CardBody>
          {sels}
        </VStack>
        <VStack maxW="35%" flex={1}>
          <VStack
            w="100%"
            flex={2}
            as={Card}
            alignItems="flex-start"
            p={6}
            spacing={5}
            divider={<StackDivider />}
          >
            <CardBody>Archived reports go here</CardBody>
          </VStack>
          <Card p={5} w="100%">
            <RecentStandardsView maxCards={3} />
          </Card>
        </VStack>
      </HStack>
    </>
  );
};

export default ReportBuilder;
