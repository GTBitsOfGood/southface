import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  useDisclosure,
} from "@chakra-ui/react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { useEffect, useState } from "react";

import useUser from "src/lib/hooks/useUser";
import AddCardModal from "../Modals/AddCardModal";
import PlanDocumentPDF from "../PlanDocumentPDF/PlanDocumentPDF";
import StandardCard from "../StandardCard/StandardCard";

const StandardCardTable = ({ cards, setCards, ...props }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isClientSide, setClientSide] = useState(false);

  const { enablepdfexport = false } = { ...props };

  const { ifAdmin } = useUser();

  useEffect(() => {
    setClientSide(true);
  }, []);

  return (
    <Box {...props}>
      {isClientSide && (
        <Flex alignItems="center" justifyContent="end" gap={4} mt={5} mr={6}>
          {enablepdfexport && (
            <Button
              as={PDFDownloadLink}
              document={<PlanDocumentPDF selectedPlanCards={cards} />}
              fileName="plan.pdf"
              boxShadow="base"
            >
              Download PDF
            </Button>
          )}

          <Button onClick={() => ifAdmin(onOpen)} rounded={4} boxShadow="base">
            Add Card
          </Button>
          <AddCardModal isOpen={isOpen} onClose={onClose} setCards={setCards} />
        </Flex>
      )}
      <Grid
        templateColumns={{
          base: "repeat(3, 1fr)",
          "2xl": "repeat(4, 1fr)"
        }}
        gap={10}
        py={{ base: "" }}
        justifyContent="center"
        width="90%"
        m="3% auto"
      >
        {cards.map((card, index) => (
          <GridItem w="100%" key={index}>
            <StandardCard card={card} setCards={setCards} />
          </GridItem>
        ))}
      </Grid>
    </Box>
  );
};

export default StandardCardTable;
