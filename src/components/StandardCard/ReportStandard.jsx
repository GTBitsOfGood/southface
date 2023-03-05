import { Box, Button, Heading } from "@chakra-ui/react";
import useActiveReport from "../../lib/hooks/useActiveReport";
import ReportStandardNoteCarousel from "./ReportStandardNoteCarousel";
import StandardCardImageCarousel from "./StandardCardImageCarousel";

const ReportStandard = ({ card, selState, ...props }) => {
  // Active report code
  // get report state
  // if state is undefined, selected = false
  // conditionally render note, images selection UI
  // editEnable,
  // useEffect on editEnable: make API call after deselecting
  const { removeFromReport } = useActiveReport();
  const handler = () => {
    removeFromReport(card);
  };
  return (
    <Box {...props}>
      <Heading>{card.title}</Heading>
      <StandardCardImageCarousel cardImages={card.images} selState={selState} />
      <ReportStandardNoteCarousel notes={card.notes} selState={selState} />
      <Button onClick={handler}>Remove from plan</Button>
    </Box>
  );
};

export { ReportStandard };
