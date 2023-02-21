import { Box, Button, Flex, Heading, VStack } from "@chakra-ui/react";
import Link from "next/link";
import useUser from "src/lib/hooks/useUser";
import SavedProjectPlan from "src/components/SavedProjectPlan/SavedProjectPlan";

const SavedProjectPlans = () => {
  const { user } = useUser();

  if (!user) return "loading";

  return (
    <Box>
      <Flex mb="10">
        {/* This needs to use the NavLink component */}
        <Link href="/plan-builder">
          <Button>Return to Project Plan Builder</Button>
        </Link>
        <Heading m="auto" ml="25%">
          Saved Project Plans
        </Heading>
      </Flex>
      <VStack p="0% 2% 0% 2%">
        {user.isLoggedIn &&
          user.archivedProjectPlan.map((plan, index) => {
            return <SavedProjectPlan key={index} plan={plan} />;
          })}
      </VStack>
    </Box>
  );
};
export default SavedProjectPlans;
