import { Box, Button, Flex, VStack } from "@chakra-ui/react";
import Link from "next/link";
import ArchivedReportCard from "src/components/ArchivedReportCard";
import useUser from "src/lib/hooks/useUser";
import urls from "src/lib/utils/urls";
import useSWR from "swr";

const ArchivedReports = () => {
  // this has to be refactored later on
  const { user } = useUser({ getArchivedReports: true });
  const { data } = useSWR(urls.api.user.getArchivedReports);
  const archivedReports = data?.payload.archivedReports;

  return (
    <Box>
      <Flex margin="10">
        <Link href="/report-builder">
          <Button variant="grey-rounded" marginBottom="20">
            Return to Report Builder Home
          </Button>
        </Link>

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
            archivedReports &&
            archivedReports.map((archivedReport, index) => {
              return <ArchivedReportCard key={index} report={archivedReport} />;
            })}
          {/* rendering an archived report with default props (exact styling from figma) */}
          <ArchivedReportCard />
        </Box>
      </VStack>
    </Box>
  );
};
export default ArchivedReports;
