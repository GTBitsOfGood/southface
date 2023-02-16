import { Box, Button, Flex, Heading, Spacer, VStack } from "@chakra-ui/react";
import SavedProjectPlan from "src/components/SavedProjectPlan/SavedProjectPlan";

const SavedProjectPlans = () => {
  // const [plans, setPlans] = useState([]);

  // useEffect(() => {
  //   getPlans().then((res) => {
  //     setPlans(res);
  //   });
  // }, []);

  return (
    <Box>
      <Flex margin="10">
        <Button
          as="a"
          href="/plan-builder"
          background="#6D6E70"
          borderRadius="3xl"
          color="white"
          marginBottom="20"
        >
          Return to Project Plan Builder Home
        </Button>
        <Spacer />
        <Heading>Saved Project Plans</Heading>
        <Spacer />
        <Button
          as="a"
          background="#6D6E70"
          borderRadius="3xl"
          color="white"
          marginBottom="20"
          visibility="hidden"
        >
          Return to Project Plan Builder Home
        </Button>
      </Flex>
      <VStack p="0% 2% 0% 2%">
        {/* {plans.map((plan, index) => {
          return <SavedProjectPlan key={index} plan={plan} />;
        })} */}
        return <SavedProjectPlan />
      </VStack>
    </Box>
  );
};
export default SavedProjectPlans;
