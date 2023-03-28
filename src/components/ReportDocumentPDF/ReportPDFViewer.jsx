import { Alert, AlertIcon, Heading, VStack } from "@chakra-ui/react";
import { PDFViewer } from "@react-pdf/renderer";
import { useEffect, useState } from "react";
import ReportDocumentPDF from "./ReportDocumentPDF";

const ReportPDFViewer = ({ report }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (report) {
      setLoaded(true);
    }
  }, [report]);

  if (!loaded) {
    return null;
  }

  return (
    <VStack style={{ height: "100%" }}>
      <Heading mb="10px">Viewing Report: {report.name}</Heading>
      {report.cards.length == 0 ? (
        <Alert status="error">
          <AlertIcon />
          This Report has no cards
        </Alert>
      ) : (
        <PDFViewer
          style={{ maxWidth: "1000px" }}
          width={"100%"}
          height={"100%"}
        >
          <ReportDocumentPDF selectedReport={report} />
        </PDFViewer>
      )}
    </VStack>
  );
};

export default ReportPDFViewer;
