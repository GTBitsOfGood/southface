import { Button, Divider, Heading, Link, Text, VStack } from "@chakra-ui/react";
import useUser from "src/lib/hooks/useUser";
import urls from "src/lib/utils/urls";
import useSWR from "swr";
import PlanComponent from "./PlanComponent";

const ArchivedReportView = () => {
  const { user } = useUser({ getArchivedReports: true });
  const { data } = useSWR(urls.api.user.getArchivedReports);
  const archivedReports = data?.payload.archivedReports;
  console.log(archivedReports);
  return (
    <>
      <Heading fontSize="1.5em">Completed Reports</Heading>
      {user?.isLoggedIn && (
        <Link
          href="/archived-reports"
          w="max"
          textDecor="none"
          _hover={{ textDecoration: "none" }}
        >
          <Button href="/" width="max" height="1.9em" variant="Grey-outlined">
            <Text fontSize="xs">See All Completed Reports</Text>
          </Button>
        </Link>
      )}
      <VStack alignItems="flex-start" divider={<Divider />}>
        {user?.isLoggedIn &&
          archivedReports &&
          archivedReports.map((archivedReport, index) => {
            return <PlanComponent key={index} report={archivedReport} />;
          })}
      </VStack>
    </>
  );
};

export default ArchivedReportView;
