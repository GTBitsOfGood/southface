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
import RecentStandardsView from "src/components/RecentStandardsView";
import { ReportStandard } from "src/components/StandardCard";
import useActiveReport from "src/lib/hooks/useActiveReport";
import ArchivedReportView from "src/components/ArchivedReportView";

const ReportBuilder = () => {
  // For PDF exporting
  const [editingTitle, setEditingTitle] = useState(false);
  useEffect(() => setEditingTitle(true), []);

  const nameRef = useRef();

  const { report, isValidating } = useActiveReport();
  const [sels, setSels] = useState([]);

  useEffect(() => {
    if (report && !isValidating) {
      // this useEffect wrapper prevents jittering
      setSels(report.cards);
    }
  }, [isValidating]);
  const useGlobalEditing = useState(false);
  return (
    <>
      <HStack pt={5} alignItems="flex-start" spacing={3}>
        <VStack
          flex={2}
          as={Card}
          alignItems="flex-start"
          p={6}
          spacing={5}
          divider={<StackDivider bg="gray.300" />}
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
                <Button pl="15px" pr="15px" variant="Grey-rounded">
                  Rename
                </Button>
              </HStack>
              <Button minW="20%" variant="Blue-rounded">
                Complete Report
              </Button>
            </Flex>
          </CardBody>
          {sels.map((cardWrapper, index) => (
            <CardBody key={index}>
              <ReportStandard
                card={cardWrapper.card}
                selState={cardWrapper}
                useGlobalEditing={useGlobalEditing}
              />
            </CardBody>
          ))}
        </VStack>
        <VStack maxW="35%" flex={1}>
          <Card w="100%" p={4} gap={3}>
            <ArchivedReportView />
          </Card>
          <Card p={5} w="100%">
            <RecentStandardsView maxCards={3} />
          </Card>
        </VStack>
      </HStack>
    </>
  );
};

export default ReportBuilder;
