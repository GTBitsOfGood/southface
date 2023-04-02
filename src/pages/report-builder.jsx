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
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { addToArchivedReport } from "../actions/User/ArchivedReport";
import ArchivedReportView from "src/components/ArchivedReportView";
import RecentStandardsView from "src/components/RecentStandardsView";
import { ReportStandard } from "src/components/StandardCard";
import useActiveReport from "src/lib/hooks/useActiveReport";
import PrintToPDFButton from "../components/PrintToPDFButton";
import useUser from "../lib/hooks/useUser";
import { useRouter } from "next/router";
import ConfirmActionModal from "../components/Modals/ConfirmActionModal";

const ReportBuilder = () => {
  // For PDF exporting
  const [editingTitle, setEditingTitle] = useState(false);
  useEffect(() => setEditingTitle(true), []);
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { user } = useUser({ redirectTo: "/login" });

  const nameRef = useRef();

  const { report, isValidating } = useActiveReport();
  const [sels, setSels] = useState([]);

  useEffect(() => {
    if (report && !isValidating) {
      // this useEffect wrapper prevents jittering
      setSels(
        report.cards.map((cardWrapper) => ({
          ...cardWrapper,
          completedDate: null, // add initial completedDate property
        }))
      );
    }
  }, [isValidating]);

  const handleCompleteReport = async ({noSave = false}) => {
    const updatedSels = sels.map((sel) => ({
      ...sel,
      completedDate: sel.completedDate || new Date(), // update completedDate if not already set
    }));
    setSels(updatedSels);

    if (noSave) {
      await addToArchivedReport();
    } else {
      await addToArchivedReport(report);
    }
    
    router.reload();  
  };

 



  const useGlobalEditing = useState(false);

  if (!user) return;

  return (
    <>
      <HStack py={10} alignItems="flex-start" spacing={3} px={8}>
        <VStack
          flex={2}
          as={Card}
          alignItems="flex-start"
          p={6}
          spacing={5}
          divider={<StackDivider color="gray.300" />}
          rounded={16}
          border="1px solid"
          borderColor="gray.300"
        >
          <CardBody m={-3} w="100%">
            <Flex
              mb={3}
              width="100%"
              flexFlow="row nowrap"
              justifyContent="space-between"
            >
              <HStack w="100%">
                {editingTitle ? ( // temp placeholder condition
                  <Heading maxW="80%" mr={3}>
                    Untitiled Report
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
                <Button minW="10%" variant="Grey-outlined-rounded">
                  Rename
                </Button>
              </HStack>
              <Button
                minW="20%"
                position="absolute"
                right="12"
                variant="Blue-rounded"
                onClick={onOpen}
                isDisabled={report?.cards?.length == 0}
              >
                Complete Report
              </Button>
              <ConfirmActionModal
                isOpen={isOpen}
                onClose={onClose}
                mainText="Would you like to save this report to Completed Reports"
                confirmButtonText="Yes, complete and save report"
                cancelButtonText="No, complete without saving report"
                handleAction={handleCompleteReport}
                handleCancelAction={() => handleCompleteReport({noSave: true})}
                isDanger={false}
                size="2xl"
              />
            </Flex>
            <PrintToPDFButton report={report} />
          </CardBody>
          {sels.map((cardWrapper, index) => (
            <CardBody pl={3} py={0} key={index}>
              <ReportStandard
                card={cardWrapper.card}
                selState={cardWrapper}
                useGlobalEditing={useGlobalEditing}
              />
            </CardBody>
          ))}
        </VStack>
        <VStack maxW="35%" flex={1} alignItems="end">
          {user?.isLoggedIn && user?.archivedReports.length > 0 && (
            <Card
              boxShadow="none"
              w="90%"
              p={4}
              gap={3}
              border="1px solid"
              borderColor="gray.300"
              rounded={16}
            >
              <ArchivedReportView />
            </Card>
          )}

          <Card
            boxShadow="none"
            p={5}
            w="90%"
            border="1px solid"
            borderColor="gray.300"
            rounded={16}
          >
            <RecentStandardsView maxCards={3} />
          </Card>
        </VStack>
      </HStack>
    </>
  );
};

export default ReportBuilder;
