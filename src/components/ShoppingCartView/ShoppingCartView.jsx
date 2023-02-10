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

const ShoppingCartView = ({ isOpen, onClose }) => {
  const shoppingCartItems = [
    { planName: "Ladder T-walls", imageNum: 2, commentNum: 8 },
    { planName: "Ladder T-walls", imageNum: 3, commentNum: 6 },
    { planName: "Ladder T-walls", imageNum: 1, commentNum: 2 },
    { planName: "Ladder T-walls", imageNum: 4, commentNum: 5 },
    { planName: "Ladder T-walls", imageNum: 6, commentNum: 7 },
  ];

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
