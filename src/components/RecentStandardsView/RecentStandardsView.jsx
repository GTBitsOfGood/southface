import { Button, Flex, Heading, Text } from "@chakra-ui/react";
import Link from "next/link";
import useUser from "../../lib/hooks/useUser";
import LoadedStandards from "./LoadedStandards";

function RecentStandardsView({ maxCards }) {
  const { user } = useUser();

  console.log(user?.recentStandards?.length);

  return (
    <Flex flexDirection="column" gap="16px">
      <Heading fontSize="1.5em">Recent Standards</Heading>
      <Link href="/library">
        <Button width="max" variant="Grey-outlined">
          <Text fontSize="xs">See All Standards</Text>
        </Button>
      </Link>
      <Flex gap="2rem" overflowX="auto" p={2}>
        {user?.recentStandards?.length > 0 ? (
          <LoadedStandards
            standardsData={user?.recentStandards}
            maxCards={maxCards}
          />
        ) : (
          <Text>No standards browsed as of yet</Text>
        )}
      </Flex>
    </Flex>
  );
}

export default RecentStandardsView;
