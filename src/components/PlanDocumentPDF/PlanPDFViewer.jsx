import { Alert, AlertIcon, Heading, VStack } from "@chakra-ui/react";
import { PDFViewer } from "@react-pdf/renderer";
import { useEffect, useState } from "react";
import PlanDocumentPDF from "./PlanDocumentPDF";

const PlanPDFViewer = ({ plan }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (plan) {
      setLoaded(true);
    }
  }, [plan]);

  if (!loaded) {
    return null;
  }

  return (
    <VStack style={{ height: "100%" }}>
      <Heading mb="10px">Viewing Plan: {plan.name}</Heading>
      {plan.cards.length == 0 ? (
        <Alert status="error">
          <AlertIcon />
          This Project Plan has no cards
        </Alert>
      ) : (
        <PDFViewer
          style={{ maxWidth: "1000px" }}
          width={"100%"}
          height={"100%"}
        >
          <PlanDocumentPDF selectedPlanCards={plan.cards} />
        </PDFViewer>
      )}
    </VStack>
  );
};

export default PlanPDFViewer;
