import { useState } from "react";
import {
  Box,
  Grid,
  GridItem,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react";
import StandardCard from "../StandardCard/StandardCard";
import { AddIcon } from "@chakra-ui/icons";
import AddCardModal from "../Modals/AddCardModal";

const StandardCardTable = ({ cards }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [cardComponents, setCardComponents] = useState(cards);
  return (
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
  );
};

export default StandardCardTable;
