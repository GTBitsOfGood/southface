import { Box, Button, Flex, Grid, GridItem } from "@chakra-ui/react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { useEffect, useState } from "react";
import useSelectionArray from "../../lib/hooks/useSelectionArray";

import ReportDocumentPDF from "../ReportDocumentPDF/ReportDocumentPDF";
import StandardCard from "../StandardCard/StandardCard";

const StandardCardTable = ({ cards, setCards, ...props }) => {
  const [isClientSide, setClientSide] = useState(false);

  const { enablepdfexport = false } = { ...props };

  useEffect(() => {
    setClientSide(true);
  }, []);

  const { selectionArray: selArr } = useSelectionArray(cards)
  return (
    <Box {...props}>
      {isClientSide && (
        <Flex alignItems="center" justifyContent="end" gap={4} mt={5} mr={6}>
          {enablepdfexport && (
            <Button
              as={PDFDownloadLink}
              document={<ReportDocumentPDF selectedReportCards={cards} />}
              fileName="report.pdf"
              boxShadow="base"
            >
              Download PDF
            </Button>
          )}
        </Flex>
      )}
      <Grid
        templateColumns={{
          base: "repeat(3, 1fr)",
          "2xl": "repeat(4, 1fr)",
        }}
        gap={10}
        py={{ base: "" }}
        justifyContent="center"
        width="90%"
        m="3% auto"
      >
        {cards.map((card, index) => (
          <GridItem w="100%" key={index}>
            <StandardCard card={card} cards={cards} setCards={setCards} selState={selArr[index]}/>
          </GridItem>
        ))}
      </Grid>
    </Box>
  );
};

export default StandardCardTable;
