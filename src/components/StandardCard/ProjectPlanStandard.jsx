import { Button, Heading, HStack } from "@chakra-ui/react";
import useActivePlan from "../../lib/hooks/useAcivePlan";

const ProjectPlanStandard = ({ card }) => {
  const { plan, updatePlan } = useActivePlan();
  const handler = () => {
    const arr = plan.cards;
    const newPlan = { ...plan };
    newPlan.cards = arr.filter((c) => c._id !== card._id);
    updatePlan(newPlan);
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
