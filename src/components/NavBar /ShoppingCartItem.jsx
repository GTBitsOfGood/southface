import { Box, Button, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import SectionSeperator from "./SectionSeperator";

const ShoppingCartItem = ({
  planName,
  imageNum,
  commentNum,
  shoppingCartItems,
  setShoppingCartItems,
}) => {
  const [hasCartItem, setHasCartItem] = useState(true);

  const toggleRemovebtn = () => {
    if (shoppingCartItems) {
      setShoppingCartItems(shoppingCartItems.slice(1));
    }
    setHasCartItem(false);
  };

  const imageURL =
    "https://user-images.githubusercontent.com/69729390/214123449-126291c9-2cde-4773-90b7-a54a38336553.png";

  return (
    hasCartItem && (
      <div>
        <Box display="flex" marginY="20px">
          <Box flex="1" paddingLeft="10px">
            <img src={imageURL} alt="Logo" layout="fill" />
          </Box>
          <Box
            flex="1.8"
            paddingX="10px"
            display="flex"
            flexDirection="column"
            alignItems="flex-start"
            justifyContent="space-between"
          >
            <Text fontSize="xl" as="b">
              {planName}
            </Text>
            <div>
              {imageNum} images * {commentNum} comments
            </div>
            <Button
              onClick={toggleRemovebtn}
              backgroundColor="#B90000"
              borderRadius="20px"
              color="white"
              fontSize="10px"
              fontWeight="bold"
            >
              Remove from project plan
            </Button>
          </Box>
        </Box>
        <SectionSeperator />
      </div>
    )
  );
};

export default ShoppingCartItem;
