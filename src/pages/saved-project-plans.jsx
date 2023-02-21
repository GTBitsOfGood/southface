import { Box, Button, Flex, Heading, VStack } from "@chakra-ui/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getPlans } from "src/actions/Plan";
import SavedProjectPlan from "src/components/SavedProjectPlan/SavedProjectPlan";
import RecentStandardsView from "../components/RecentStandardsView";
import useUser from "../lib/hooks/useUser";

const SavedProjectPlans = () => {
  const [plans, setPlans] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    getPlans().then((res) => {
      setPlans(res);
    });
  }, []);

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
      <RecentStandardsView
        standardsData={user?.recentStandards}
        maxCards={3}
      ></RecentStandardsView>
      <VStack p="0% 2% 0% 2%">
        {plans.map((plan, index) => {
          return <SavedProjectPlan key={index} plan={plan} />;
        })}
      </VStack>
    </Box>
  );
};
export default SavedProjectPlans;
