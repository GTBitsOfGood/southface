import { Button, Flex, Heading } from "@chakra-ui/react";
import Link from "next/link";
import useUser from "../../lib/hooks/useUser";
import LoadedStandards from "./LoadedStandards";

function RecentStandardsView(props) {
  const { user } = useUser();

  return (
    <Flex flexDirection={"column"} gap="16px" overflowX="scroll">
      <Heading size="lg">Recent Standards</Heading>
      <Link href="/library">
        <Button width="max" variant="Grey-outlined">
          See All Standards
        </Button>
      </Link>
      <Flex gap="2rem" overflowX="auto">
        <LoadedStandards
          standardsData={user?.recentStandards}
          maxCards={props.maxCards}
        ></LoadedStandards>
      </Flex>
    </Flex>
  );
}

export default RecentStandardsView;
