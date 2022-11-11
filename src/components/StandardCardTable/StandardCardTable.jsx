import { useState, useEffect } from "react";
import {
  Grid,
  GridItem,
  IconButton,
  useDisclosure,
  Box,
  Button,
  Flex,
} from "@chakra-ui/react";
import { PDFDownloadLink } from "@react-pdf/renderer";

import AddCardModal from "../Modals/AddCardModal";
import StandardCard from "../StandardCard/StandardCard";
import PlanDocumentPDF from "../PlanDocumentPDF/PlanDocumentPDF";

const StandardCardTable = ({ cards, ...props }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isClientSide, setClientSide] = useState(false);
  const [cardComponents, setCardComponents] = useState(cards);

  const { enablePDFExport = true } = { ...props };

  useEffect(() => {
    setClientSide(true);
  }, []);

  // cards property may be stateful
  useEffect(() => {
    setCardComponents(cards);
  }, [cards]);
  return (
    <Box {...props}>
      {isClientSide && (
        <Flex alignItems="center" justifyContent="end" gap={4} mr={6}>
          {enablePDFExport && (
            <Button
              as={PDFDownloadLink}
              document={<PlanDocumentPDF selectedPlanCards={cards} />}
              fileName="plan.pdf"
              boxShadow="base"
            >
              Download PDF
            </Button>
          )}

          <Button onClick={onOpen} rounded={4} boxShadow="base">
            Add Card
          </Button>
          <AddCardModal
            isOpen={isOpen}
            onClose={onClose}
            setCards={setCardComponents}
          />
        </Flex>
      )}
      <Grid
        templateColumns={{
          base: "repeat(1, 1fr)",
          sm: "repeat(2, 1fr)",
          md: "repeat(3, 1fr)",
          lg: "repeat(4, 1fr)",
        }}
        gap={4}
        py={{ base: "" }}
        justifyContent="center"
        width="90%"
        m="3% auto"
      >
        {cardComponents.map((card, index) => (
          <GridItem w="100%" key={index} rounded={12}>
            <StandardCard card={card} />
          </GridItem>
        ))}
      </Grid>
    </Box>
  );
};

export default StandardCardTable;
