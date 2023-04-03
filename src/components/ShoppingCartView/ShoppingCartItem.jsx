import { Box, Button, Divider, Image, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { DEFAULT_IMAGE } from "src/lib/utils/constants";

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
              fallbackSrc={DEFAULT_IMAGE}
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
              variant="Red-rounded"
              fontSize="xs"
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
