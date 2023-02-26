import { Box, Button, Heading } from "@chakra-ui/react";
import useActiveReport from "../../lib/hooks/useActiveReport";
import StandardCardImageCarousel from "./StandardCardImageCarousel";

const ReportStandard = ({ card, setCards, ...props }) => {
  const { plan, updatePlan } = useActiveReport();
  const handler = () => {
    const arr = plan.cards;
    const newPlan = { ...plan };
    newPlan.cards = arr.filter((c) => c._id !== card._id);
    updatePlan(newPlan);
  };
  return (
    <Box {...props}>
      <Heading>{card.title}</Heading>
      <StandardCardImageCarousel
        cardImages={card.images}
      />
      <Button onClick={handler}>Remove from plan</Button>
    </Box>
  );
};

export { ReportStandard };
