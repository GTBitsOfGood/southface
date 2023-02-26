import { Card, Heading, HStack, VStack } from "@chakra-ui/react";
import ArchivedReportView from "../components/ArchivedReportView";
import RecentStandardsView from "../components/RecentStandardsView";

const ReportBuilder = () => {
  // For PDF exporting
  // const [hasLoaded, setHasLoaded] = useState(false);
  // useEffect(() => setHasLoaded(true), []);
  // const { user } = useUser();

  // Confimation modal
  // const { isOpen, onOpen, onClose } = useDisclosure();
  // const nameRef = useRef();

  return (
    <>
      <HStack spacing={5} p={8} alignItems="flex-start">
        <VStack flex={2} h="40em" as={Card}>
          <Heading width="100%">Report Builder</Heading>
        </VStack>
        <VStack flex={1} maxWidth={{ base: "36%", "2xl": "23%" }}>
          <Card w="100%" p={4} gap={3}>
            <ArchivedReportView />
          </Card>
          <Card w="100%">
            <RecentStandardsView maxCards={3}></RecentStandardsView>
          </Card>
        </VStack>
      </HStack>
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
          <Box minWidth="40%" as="span">
            <Input
              type="text"
              placeholder="Name your report"
              fontSize="3xl"
              variant="flushed"
              mt="3"
              pb="3"
              borderBottomWidth="3px"
              borderColor="darkgray"
              ref={nameRef}
            />
          </Box>
          <HStack>
            {hasLoaded && (
              <PDFDownloadLink fileName="report.pdf">
                {({ loading }) => (
                  <Button>{loading ? "Loading document..." : "PDF"}</Button>
                )}
              </PDFDownloadLink>
            )}
            <Button onClick={onOpen} bg="gold" color="white">
              End Report
            </Button>
          </HStack>
        </Flex>
      </Flex> */}
      {/* <ReportConfirmationModal
        isOpen={isOpen}
        onClose={onClose}
        handleSave={SaveReportHandler}
        handleDiscard={DiscardReportHandler}
      /> */}
    </>
  );
};

export default ReportBuilder;
