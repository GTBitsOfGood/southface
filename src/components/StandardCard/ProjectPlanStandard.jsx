import { Button, Heading, HStack } from "@chakra-ui/react";
import { removeFromActivePlan } from "../../actions/User";

const ProjectPlanStandard = ({ card }) => {
  const handler = () => {
    removeFromActivePlan(card);
  };
  return (
    <>
      <HStack>
        <Heading>{card.title}</Heading>
        <Button onClick={handler}>Remove from plan</Button>
      </HStack>
    </>
  );
};

export { ProjectPlanStandard };
