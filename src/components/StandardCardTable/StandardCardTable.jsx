import React from "react";
import {
  Box,
  Grid,
  GridItem,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { PDFDownloadLink } from "@react-pdf/renderer";

import AddCardModal from "../Modals/AddCardModal";
import StandardCard from "../StandardCard/StandardCard";
import PlanDocumentPDF from "../PlanDocumentPDF/PlanDocumentPDF";

const StandardCardTable = ({ cards }) => {
  const [cardComponents, setCardComponents] = React.useState(cards);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isClientSide, setClientSide] = React.useState(false);

  React.useEffect(() => {
    setClientSide(true);
  }, []);

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
          base: "repeat(1, 300px)",
          md: "repeat(2, 300px)",
          lg: "repeat(3, 300px)",
          xl: "repeat(4, 300px)",
        }}
        gap={{
          base: "2%",
          md: "3%",
          lg: "5%",
        }}
        m="10% 5% 15%"
        justifyContent="center"
      >
        {cardComponents.map((card, index) => (
          <GridItem w="100%" mb="15%" key={index}>
            <Box display="flex">
              <Box w="320px" h="510px" bg="white" zIndex={2}>
                <StandardCard card={card} />
              </Box>
              <Box
                w="320px"
                h="510px"
                bg="white"
                borderColor="#D9D9D9"
                borderWidth="2px"
                ml="-100%"
                mr="-100%"
                mt="4%"
                zIndex={1}
              ></Box>

              <Box
                w="320px"
                h="510px"
                bg="white"
                borderColor="#D9D9D9"
                borderWidth="2px"
                ml="-0%"
                mr="-50%"
                mt="8%"
                zIndex={0}
              ></Box>
            </Box>
          </GridItem>
        ))}
        <IconButton
          icon={<AddIcon />}
          justifySelf="center"
          alignSelf="center"
          size="lg"
          onClick={onOpen}
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
