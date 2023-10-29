import { Box, Button, Heading, HStack } from "@chakra-ui/react";
import { useState } from "react";
import useActiveReport from "../../lib/hooks/useActiveReport";
import ReportStandardNotes from "./ReportStandardNoteCarousel";
import StandardCardImageCarousel from "./StandardCardImageCarousel";

const ReportStandard = ({ cardWrapper, card, notes, selState, ...props }) => {
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
    <Box {...props} p={0}>
      <HStack justify="space-between">
        <Heading size="lg" mb={5} maxWidth="80%">
          {card.title}
        </Heading>
        <Box>
          {(!globalEditing || editing) && (
            <Button variant="Grey-rounded" mr={3} onClick={editHandler}>
              {!editing ? "Edit" : "Save changes"}
            </Button>
          )}
          {!globalEditing && (
            <Button variant="Red-rounded" onClick={removeHandler}>
              Remove
            </Button>
          )}
        </Box>
      </HStack>
      <StandardCardImageCarousel
        cardImages={card.images}
        selState={selState}
        editing={editing}
      />
      <Heading textColor="#3F3F3F" size="md">
        Criteria
      </Heading>
      <Box mb={5}>{card.criteria}</Box>
      <ReportStandardNotes
        cols={3}
        cardWrapper={cardWrapper}
        notes={notes}
        selState={selState}
        card={card}
        editing={editing}
      />
    </Box>
  );
};

export { ReportStandard };
