import React from "react";
import {
  Box,
  Grid,
  GridItem,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";

import AddCardModal from "../Modals/AddCardModal";
import StandardCard from "../StandardCard/StandardCard";

const StandardCardTable = ({ cards }) => {
  const [cardComponents, setCardComponents] = React.useState(cards);
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box>
      <Grid
        templateColumns={{
          base: "repeat(1, 300px)",
          sm: "repeat(1, 300px)",
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
        py={{ base: "" }}
      >
        {cardComponents.map((card, index) => (
          <GridItem w="100%" mb="15%" key={index}>
            <Box display="flex" >
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
