import { Box, Button, Flex, Heading, Spacer, VStack } from "@chakra-ui/react";
import ProjectPlanCard from "src/components/ProjectPlanCard";
import useUser from "src/lib/hooks/useUser";

const SavedProjectPlans = () => {
  const { user } = useUser();

  if (!user) return "loading";

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
        <Box
          padding="10"
          borderRadius="25"
          borderWidth="0.5px"
          borderColor="lightgrey"
          width="full"
        >
          {user.isLoggedIn &&
            user.archivedProjectPlan.map((plan, index) => {
              return <ProjectPlanCard key={index} plan={plan} />;
            })}
          {/* rendering a plan with default props (exact styling from figma) */}
          <ProjectPlanCard />
        </Box>
      </VStack>
    </Box>
  );
};
export default SavedProjectPlans;
