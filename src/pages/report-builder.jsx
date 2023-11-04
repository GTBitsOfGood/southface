import {
  Box,
  Button,
  Card,
  CardBody,
  Flex,
  Heading,
  HStack,
  Link,
  Spinner,
  StackDivider,
  Text,
  useBreakpointValue,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import ArchivedReportView from "src/components/ArchivedReportView";
import RecentStandardsView from "src/components/RecentStandardsView";
import { ReportStandard } from "src/components/StandardCard";
import useActiveReport from "src/lib/hooks/useActiveReport";
import urls from "src/lib/utils/urls";
import useSWR from "swr";
import {
  addToArchivedReport,
  removeArchivedReport,
} from "../actions/User/ArchivedReport";
import ConfirmActionModal from "../components/Modals/ConfirmActionModal";
import PreviewPDFButton from "../components/PreviewPDFButton";
import useUser from "../lib/hooks/useUser";

const ReportBuilder = () => {
  // For PDF exporting
  const [renaming, setRenaming] = useState(false);
  const renameEditableRef = useRef();
  const cardWidth = useBreakpointValue({ base: "100%", md: "25%" });
  const hStackSpacing = useBreakpointValue({ base: 0, md: 3 });
  const flexDirection = useBreakpointValue({ base: "column", md: "row" });

  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { user } = useUser({ redirectTo: "/login" });

  const { report, isValidating, updateReport } = useActiveReport();

  const [nameField, setNameField] = useState(report.name);
  const [renamedData, setRenamedData] = useState(report.name);
  const [isLoadingState, setIsLoadingState] = useState(true);

  const [sels, setSels] = useState([]);

  const archivedReports = useSWR(urls.api.user.getArchivedReports).data?.payload
    .archivedReports;

  useEffect(() => {
    if (report && !isValidating) {
      // this useEffect wrapper prevents jittering
      setNameField(report.name);
      setRenamedData(report.name);
      setSels(
        report.cards.map((cardWrapper) => ({
          ...cardWrapper,
          completedDate: null, // add initial completedDate property
        }))
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isValidating]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoadingState(false), 500);
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
      if (archivedReports.map((report) => report._id).includes(report._id)) {
        await removeArchivedReport(report._id);
      }
      await addToArchivedReport(report);
    }

    router.reload();
  };

  const useGlobalEditing = useState(false);
  if (!user) return;

  const handleSaveChanges = async () => {
    if (renameEditableRef.current) {
      if (!(renamedData?.length > 0)) {
        setRenamedData("Untitled Report");
      }
      let newReport = JSON.parse(JSON.stringify(report));
      newReport.name = (renamedData ?? "Untitled Report").trim();
      await updateReport(newReport);
      setRenaming(false);
    }
  };

  const handleDiscardChanges = () => {
    if (renamedData == "" || report.name == "") {
      report.name = "Untitled Report";
    }
    setRenamedData(report.name ?? "Untitled Report");
    renameEditableRef.current.innerHTML = report.name ?? "Untitled Report";
    setRenaming(false);
  };

  if (isLoadingState)
    return (
      <Spinner
        size="xl"
        position="fixed"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
      />
    );

  return (
    <>
      <HStack
        py={10}
        display={isLoadingState ? "none" : "flex"}
        alignItems="flex-start"
        spacing={hStackSpacing}
        px={8}
        flexDir={flexDirection}
      >
        {!(sels?.length > 0) ? (
          <VStack
            as={Card}
            alignItems="flex-start"
            p={6}
            gap={8}
            rounded={16}
            border="1px solid"
            borderColor="gray.300"
            height="43em"
            flex={2}
          >
            <Box>
              <Text as="b" fontSize="2xl">
                Current Report
              </Text>
              <Text fontSize="xl">
                {"You haven’t started building a current report yet. " +
                  "Browse the digital library to begin adding to your current report."}
              </Text>
            </Box>
            <Link href="/library">
              <Button variant="Grey-rounded">Browse Digital Library</Button>
            </Link>
          </VStack>
        ) : (
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
                    onKeyPress={(e) => {
                      if (e.key === "Enter") e.preventDefault();
                    }}
                    fontFamily="Roboto Slab"
                  >
                    {nameField || "Untitled Report"}
                  </Heading>
                  {renaming ? (
                    <Flex gap={2}>
                      <Button
                        minW="9rem"
                        variant="Grey-outlined-rounded"
                        onClick={handleDiscardChanges}
                        fontFamily="'Europa-Bold', sans-serif"
                      >
                        Discard Changes
                      </Button>
                      <Button
                        minW="9rem"
                        variant="Grey-rounded"
                        onClick={handleSaveChanges}
                        isDisabled={
                          !renamedData || renamedData.trim().length == 0
                        }
                        fontFamily="'Europa-Bold', sans-serif"
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
                      fontFamily="'Europa-Bold', sans-serif"
                    >
                      Rename
                    </Button>
                  )}
                </Flex>

                <Button
                  minW="20%"
                  position="absolute"
                  right="12"
                  variant="Blue-rounded"
                  onClick={onOpen}
                  isDisabled={report?.cards?.length == 0}
                  fontFamily="'Europa-Bold', sans-serif"
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
              <PreviewPDFButton report={report} sels={sels}/>
            </CardBody>
            {sels.map((cardWrapper, index) => (
              <CardBody pl={3} py={0} key={index}>
                <ReportStandard
                  cardWrapper={cardWrapper}
                  card={cardWrapper.card}
                  notes={cardWrapper.notes}
                  selState={cardWrapper}
                  useGlobalEditing={useGlobalEditing}
                />
              </CardBody>
            ))}
          </VStack>
        )}
        <VStack w={cardWidth} alignItems="end">
          {user?.isLoggedIn && user?.archivedReports.length > 0 && (
            <Card
              boxShadow="none"
              w="100%"
              p={5}
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
            w="100%"
            h="320px"
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
