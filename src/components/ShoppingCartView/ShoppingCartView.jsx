import {
  Box,
  Button,
  Divider,
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
} from "@chakra-ui/react";
import Link from "next/link";
import urls from "src/lib/utils/urls";
import ShoppingCartItem from "./ShoppingCartItem";

const ShoppingCartView = ({ isOpen, onClose, shoppingCartItems }) => {
  return (
    <Drawer isOpen={isOpen} onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent justifyContent="space-between">
        <Box>
          <DrawerHeader display="flex" justifyContent="center">
            Atlanta Construction 47
          </DrawerHeader>
          <Divider orientation="horizontal" />
          {shoppingCartItems.slice(0, 3).map((item, index) => (
            <ShoppingCartItem
              key={index}
              planName={item.planName}
              imageNum={item.imageNum}
              commentNum={item.commentNum}
              shoppingCartItems={item.shoppingCartItems}
              // setShoppingCartItems={item.setShoppingCartItems}
            />
          ))}
        </Box>
        <Box display="flex" justifyContent="center">
          <Link href={urls.pages.planbuilder}>
            <Button
              background="#6D6E70"
              borderRadius="3xl"
              color="white"
              marginBottom="20"
            >
              View Full Plan
            </Button>
          </Link>
        </Box>
      </DrawerContent>
    </Drawer>
  );
};

export default ShoppingCartView;
