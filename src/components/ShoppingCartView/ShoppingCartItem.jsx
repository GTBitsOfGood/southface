import { Box, Button, Divider, Image, Text } from "@chakra-ui/react";
import useActiveReport from "../../lib/hooks/useActiveReport";

const ShoppingCartItem = ({ card, selState }) => {
  const { removeFromReport } = useActiveReport();

  const removeHandler = () => {
    removeFromReport(card);
  };
  console.log("Card: ", card)
  const selectedImages = card.images.filter(
    (_, index) => selState.imgSelections[index]
  );
  const selectedNotes = card.notes.filter(
    (_, index) => selState.noteSelections[index]
  );
  return (
    <Box>
      <Box display="flex" marginY="3">
        {selectedImages.length > 0 && (
          <Box flex="1" paddingLeft="2.5">
            <Image
              src={selectedImages[0].imageUrl}
              fallbackSrc="https://user-images.githubusercontent.com/69729390/214123449-126291c9-2cde-4773-90b7-a54a38336553.png"
              alt="Shopping Cart Image"
            />
          </Box>
        )}
        <Box
          flex="1.8"
          paddingX="2"
          display="flex"
          flexDirection="column"
          alignItems="flex-start"
          justifyContent="space-between"
        >
          <Text fontSize="xl" as="b">
            {card.title}
          </Text>
          <Box>
            {selectedImages.length}{" "}
            {`image${selectedImages.length !== 1 ? "s" : ""}`} &middot;{" "}
            {selectedNotes.length}{" "}
            {`note${selectedNotes.length !== 1 ? "s" : ""}`}
          </Box>
          <Button onClick={removeHandler} variant="Red-rounded" fontSize="xs">
            Remove from report
          </Button>
        </Box>
      </Box>
      <Divider orientation="horizontal" />
    </Box>
  );
};

export default ShoppingCartItem;
