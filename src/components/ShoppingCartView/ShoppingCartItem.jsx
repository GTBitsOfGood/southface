import { Box, Button, Divider, Image, Text } from "@chakra-ui/react";
import React, { useState } from "react";

const ShoppingCartItem = ({
  reportName,
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

  return (
    hasCartItem && (
      <Box>
        <Box display="flex" marginY="3">
          <Box flex="1" paddingLeft="2.5">
            <Image
              src="../../../public/static/ShoppingCartImg.png"
              fallbackSrc="https://user-images.githubusercontent.com/69729390/214123449-126291c9-2cde-4773-90b7-a54a38336553.png"
              alt="Shopping Cart Image"
            />
          </Box>
          <Box
            flex="1.8"
            paddingX="2"
            display="flex"
            flexDirection="column"
            alignItems="flex-start"
            justifyContent="space-between"
          >
            <Text fontSize="xl" as="b">
              {reportName}
            </Text>
            <Box>
              {imageNum} images * {commentNum} comments
            </Box>
            <Button
              onClick={toggleRemovebtn}
              backgroundColor="#B90000"
              borderRadius="3xl"
              color="white"
              fontSize="xs"
              fontWeight="bold"
            >
              Remove from report
            </Button>
          </Box>
        </Box>
        <Divider orientation="horizontal" />
      </Box>
    )
  );
};

export default ShoppingCartItem;
