import {
  Button,
  Card,
  CardBody,
  Flex,
  Heading,
  HStack,
  StackDivider,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import ArchivedReportView from "src/components/ArchivedReportView";
import RecentStandardsView from "src/components/RecentStandardsView";
import { ReportStandard } from "src/components/StandardCard";
import useActiveReport from "src/lib/hooks/useActiveReport";
import { addToArchivedReport } from "../actions/User/ArchivedReport";
import ConfirmActionModal from "../components/Modals/ConfirmActionModal";
import PrintToPDFButton from "../components/PrintToPDFButton";
import useUser from "../lib/hooks/useUser";

const ReportBuilder = () => {
  // For PDF exporting
  const [renaming, setRenaming] = useState(false);
  const [renamedData, setRenamedData] = useState();
  const renameEditableRef = useRef();

  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { user } = useUser({ redirectTo: "/login" });

  const { report, isValidating, updateReport } = useActiveReport();

  const [sels, setSels] = useState([]);

  useEffect(() => {
    console.log(report.name);
  }, [report.name]);

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

  const handleCompleteReport = async ({ noSave = false }) => {
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
              gap={2}
            >
              <Flex gap={2}>
                <Heading
                  contentEditable={renaming}
                  suppressContentEditableWarning
                  ref={renameEditableRef}
                  onInput={(e) => {
                    setRenamedData(e.currentTarget.textContent);
                  }}
                >
                  {report.name || "Default Report"}
                </Heading>
                {renaming ? (
                  <Flex gap={2}>
                    <Button
                      minW="9rem"
                      variant="Grey-outlined-rounded"
                      onClick={() => {
                        setRenamedData(undefined);
                        setRenaming(false);
                      }}
                    >
                      Discard Changes
                    </Button>
                    <Button
                      minW="9rem"
                      variant="Grey-rounded"
                      onClick={async () => {
                        if (renameEditableRef.current) {
                          if (!(renamedData?.length > 0)) {
                            setRenamedData("Default Report");
                          }
                          let newReport = JSON.parse(JSON.stringify(report));
                          newReport.name = renamedData ?? "Default Report";
                          await updateReport(newReport);
                          setRenaming(false);
                        }
                      }}
                    >
                      Save Changes
                    </Button>
                  </Flex>
                ) : (
                  <Button
                    minW="6rem"
                    variant="Grey-outlined-rounded"
                    onClick={() => setRenaming(true)}
                  >
                    Rename
                  </Button>
                )}
              </Flex>
              <Button
                minW="20%"
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
                handleCancelAction={() =>
                  handleCompleteReport({ noSave: true })
                }
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
