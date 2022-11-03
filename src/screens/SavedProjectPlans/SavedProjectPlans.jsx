import { getCards } from "../../actions/Card";
import Link from "next/link";
import {
  Button,
  HStack,
  Center,
  Heading,
  Flex,
  Text,
  Box,
  Grid,
  VStack,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PlanDocumentPDF from "../../components/PlanDocumentPDF/PlanDocumentPDF";
import SavedProjectPlan from "../../components/SavedProjectPlan/SavedProjectPlan";

const SavedProjectPlans = () => {
  // Primary state in this page is the selections array
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    // GET PLANS HERE
  }, []);

  return (
    <Box>
      <Flex mb="10">
        <Link href="/projectPlanBuilder">
          <Button>Return to Project Plan Builder</Button>
        </Link>
        <Heading m="auto" ml="25%">
          Saved Project Plans
        </Heading>
      </Flex>
      <VStack p="0% 2% 0% 2%">
        {/* GET ALL PROJECT PLANS ASSOCIATED WITH USER AND LOOP THROUGH HERE */}
        {/* <SavedProjectPlan plan={ plan }/> */}
        <SavedProjectPlan />
      </VStack>
    </Box>
  );
};
export default SavedProjectPlans;
