import { useState, useEffect } from "react";
import {
  Grid,
  GridItem,
  IconButton,
  useDisclosure,
  Box,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { PDFDownloadLink } from "@react-pdf/renderer";

import AddCardModal from "../Modals/AddCardModal";
import StandardCard from "../StandardCard/StandardCard";
import PlanDocumentPDF from "../PlanDocumentPDF/PlanDocumentPDF";

const StandardCardTable = ({ cards }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isClientSide, setClientSide] = useState(false);
  const [cardComponents, setCardComponents] = useState(cards);

  useEffect(() => {
    setClientSide(true);
  }, []);

  // cards property may be stateful
  useEffect(() => {
    setCardComponents(cards);
  }, [cards]);
  return (
    <Box>
      {isClientSide && (
        <PDFDownloadLink
          document={<PlanDocumentPDF selectedPlanCards={cards} />}
          fileName="plan.pdf"
          style={{
            padding: "10px",
            backgroundColor: "#f2f2f2",
            borderRadius: "5px",
            marginLeft: "85%",
          }}
        >
          {({ blob, url, loading, error }) =>
            loading ? "Loading document..." : "Download PDF"
          }
        </PDFDownloadLink>
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
          <GridItem w="100%" key={index}>
            <StandardCard card={card} />
          </GridItem>
        ))}

        <IconButton
          icon={<AddIcon />}
          size="lg"
          onClick={onOpen}
          alignSelf="center"
          justifySelf="center"
          rounded={4}
          boxShadow="base"
          mt={2}
        />
        <AddCardModal
          isOpen={isOpen}
          onClose={onClose}
          setCards={setCardComponents}
        />
      </Grid>
    </Box>
  );
};

export default StandardCardTable;
