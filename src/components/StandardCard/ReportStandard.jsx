import { Box, Button, Heading, HStack } from "@chakra-ui/react";
import { useState } from "react";
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
  const { useGlobalEditing: [globalEditing, setGlobalEditing] = [] } = {
    ...props,
  };
  const [editing, setEditing] = useState(false);
  const removeHandler = () => {
    removeFromReport(card);
  };
  const editHandler = () => {
    setGlobalEditing((prev) => {
      setEditing((prev) => !prev);
      return !prev;
    });
  };
  return (
    <Box {...props}>
      <HStack justify="space-between">
        <Heading>{card.title}</Heading>
        <Box>
          {(!globalEditing || editing) && (
            <Button onClick={editHandler}>
              {!editing ? "Edit" : "Save changes"}
            </Button>
          )}
          {!globalEditing && <Button onClick={removeHandler}>Remove</Button>}
        </Box>
      </HStack>
      <StandardCardImageCarousel
        cardImages={card.images}
        selState={selState}
        editing={editing}
      />
      <ReportStandardNoteCarousel
        cols={3}
        notes={card.notes}
        selState={selState}
        editing={editing}
      />
    </Box>
  );
};

export { ReportStandard };
