import { getPlans } from "../../actions/Plan";
import Link from "next/link";
import { Button, Heading, Flex, Box, VStack } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import SavedProjectPlan from "../../components/SavedProjectPlan/SavedProjectPlan";

const SavedProjectPlans = () => {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    getPlans().then((res) => {
      setPlans(res);
    });
  }, []);

  return (
    <Box>
      <Flex mb="10">
        <Link href="/plan-builder">
          <Button>Return to Project Plan Builder</Button>
        </Link>
        <Heading m="auto" ml="25%">
          Saved Project Plans
        </Heading>
      </Flex>
      <VStack p="0% 2% 0% 2%">
        {plans.map((plan, index) => {
          return <SavedProjectPlan key={index} plan={plan} />;
        })}
      </VStack>
    </Box>
  );
};
export default SavedProjectPlans;
