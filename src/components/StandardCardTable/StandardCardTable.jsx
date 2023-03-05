import { Box, Button, Flex, Grid, GridItem } from "@chakra-ui/react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { useEffect, useState } from "react";
import useActiveReport from "../../lib/hooks/useActiveReport";

import ReportDocumentPDF from "../ReportDocumentPDF/ReportDocumentPDF";
import StandardCard from "../StandardCard/StandardCard";

const StandardCardTable = ({ cards, setCards, ...props }) => {
  const [isClientSide, setClientSide] = useState(false);

  const { enablepdfexport = false } = { ...props };

  useEffect(() => {
    setClientSide(true);
  }, []);

  const { report, isValidating } = useActiveReport();
  const [selArr, setSelArr] = useState([]); // array of ar objects or undefined objects, updated when report changes
  // useEffect on report:
    // cards.map(card => card.id in report.cardIds ? report.cardWrapper : undefined)
  useEffect(() => {
    if (report && !isValidating) {
      const reportIds = report.cards.map((c) => c.card._id);
      const newArr = cards.map((card) => {
        const i = reportIds.indexOf(card._id);
        if (i < 0) {
          return undefined;
        } else {
          return report.cards[i];
        }
      });
      setSelArr(newArr);
    }
  }, [isValidating])

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
            <StandardCard card={card} setCards={setCards} selState={selArr[index]}/>
          </GridItem>
        ))}
      </Grid>
    </Box>
  );
};

export default StandardCardTable;
