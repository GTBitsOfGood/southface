import { Box, Button, Flex, Heading, Spacer, VStack } from "@chakra-ui/react";
import Link from "next/link";
import ArchivedReportCard from "src/components/ArchivedReportCard";
import useUser from "src/lib/hooks/useUser";

const SavedReports = () => {
  const { user } = useUser();

  console.log(user);

  return (
    <Box>
      <Flex margin="10">
        <Link href="/report-builder">
          <Button
            background="#6D6E70"
            borderRadius="3xl"
            color="white"
            marginBottom="20"
          >
            Return to Report Builder Home
          </Button>
        </Link>

        <Spacer />
        <Heading>Reports</Heading>
        <Spacer />
        <Button
          as="a"
          background="#6D6E70"
          borderRadius="3xl"
          color="white"
          marginBottom="20"
          visibility="hidden"
        >
          Return to Report Builder Home
        </Button>
      </Flex>
      <VStack p="0% 2% 0% 2%">
        <Box
          padding="10"
          borderRadius="25"
          borderWidth="0.5px"
          borderColor="lightgrey"
          width="full"
        >
          {user?.isLoggedIn &&
            user?.archivedReports.map((archivedReport, index) => {
              return <ArchivedReportCard key={index} report={archivedReport} />;
            })}
          {/* rendering an archived report with default props (exact styling from figma) */}
          <ArchivedReportCard />
        </Box>
      </VStack>
    </Box>
  );
};
export default SavedReports;
