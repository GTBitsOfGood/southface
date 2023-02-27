import { Button, Flex, Heading, Text } from "@chakra-ui/react";
import Link from "next/link";
import useUser from "../../lib/hooks/useUser";
import LoadedStandards from "./LoadedStandards";

function RecentStandardsView(props) {
  const { user } = useUser();

  return (
    <Flex flexDirection={"column"} gap="16px">
      <Heading fontSize="1.5em">Recent Standards</Heading>
      <Link href="/library">
        <Button width="max" variant="Grey-outlined">
          <Text fontSize="xs">See All Standards</Text>
        </Button>
      </Link>
      <Flex gap="2rem" overflowX="auto" p={2}>
        <LoadedStandards
          standardsData={user?.recentStandards}
          maxCards={props.maxCards}
        />
      </Flex>
    </Flex>
  );
}

export default RecentStandardsView;
