import { Box, Button, Flex, Heading, HStack, Input } from "@chakra-ui/react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import useUser from "src/lib/hooks/useUser";
import RecentStandardsView from "../components/RecentStandardsView";

const ReportBuilder = () => {
  // For PDF exporting
  const [hasLoaded, setHasLoaded] = useState(false);
  useEffect(() => setHasLoaded(true), []);
  const { user } = useUser();

  // Confimation modal
  // const { isOpen, onOpen, onClose } = useDisclosure();
  const nameRef = useRef();

  return (
    <>
      <Flex flexFlow="row nowrap" mb="10">
        <Button opacity="0" cursor="default">
          View Reports
        </Button>
        <RecentStandardsView maxCards={3}></RecentStandardsView>
        <Heading flex="1" gridArea="stack" textAlign="center">
          Report Builder
        </Heading>
        {user?.isLoggedIn && (
          <Link href="/archived-reports">
            <Button href="/">View Archived Reports</Button>
          </Link>
        )}
      </Flex>
      <Flex
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
            {/* <Button onClick={onOpen} bg="gold" color="white">
              End Report
            </Button> */}
          </HStack>
        </Flex>
      </Flex>
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
