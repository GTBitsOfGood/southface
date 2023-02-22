import { Button, Flex, Heading } from "@chakra-ui/react";
import Link from "next/link";
import useUser from "../../lib/hooks/useUser";
import LoadedStandards from "./LoadedStandards";

function RecentStandardsView(props) {
  const { user } = useUser();

  return (
    <Flex flexDirection={"column"} gap="16px">
      <Heading size="lg">Recent Standards</Heading>
      <Link href="/library">
        <Button
          h="30px"
          bgColor="#727474"
          borderRadius="20"
          textColor="white"
          width="max"
        >
          See All Standards
        </Button>
      </Link>
      <Flex gap="2rem" overflowX="auto">
        <LoadedStandards
          standardsData={user?.standardsData}
          maxCards={props.maxCards}
        ></LoadedStandards>
      </Flex>
    </Flex>
  );
}

export default RecentStandardsView;
