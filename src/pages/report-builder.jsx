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
  const renameEditableRef = useRef();

  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { user } = useUser({ redirectTo: "/login" });

  const { report, isValidating, updateReport } = useActiveReport();

  const [nameField, setNameField] = useState(report.name);
  const [renamedData, setRenamedData] = useState(report.name);
  const [isLoadingState, setIsLoadingState] = useState(true);

  const [sels, setSels] = useState([]);

  useEffect(() => {
    if (report && !isValidating) {
      // this useEffect wrapper prevents jittering
      setNameField(report.name);
      setSels(
        report.cards.map((cardWrapper) => ({
          ...cardWrapper,
          completedDate: null, // add initial completedDate property
        }))
      );
    }
  }, [isValidating, report]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoadingState(false), 1000);
    console.log("Here");
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (renaming) {
      renameEditableRef.current.focus();
      document.execCommand("selectAll", true, null);
    }
  }, [renaming]);

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
      <HStack
        py={10}
        display={isLoadingState ? "none" : "flex"}
        alignItems="flex-start"
        spacing={3}
        px={8}
      >
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
                  {nameField || "Default Report"}
                </Heading>
                {renaming ? (
                  <Flex gap={2}>
                    <Button
                      minW="9rem"
                      variant="Grey-outlined-rounded"
                      onClick={() => {
                        setRenamedData(report.name);
                        renameEditableRef.current.innerHTML = report.name;
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
                          console.log("newReport", newReport);
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
                    onClick={() => {
                      setRenaming(true);
                      renameEditableRef.current.focus();
                    }}
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
