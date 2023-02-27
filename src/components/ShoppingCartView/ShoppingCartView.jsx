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
    { reportName: "Ladder T-walls", imageNum: 2, commentNum: 8 },
    { reportName: "Ladder T-walls", imageNum: 3, commentNum: 6 },
    { reportName: "Ladder T-walls", imageNum: 1, commentNum: 2 },
    { reportName: "Ladder T-walls", imageNum: 4, commentNum: 5 },
    { reportName: "Ladder T-walls", imageNum: 6, commentNum: 7 },
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
              reportName={item.reportName}
              imageNum={item.imageNum}
              commentNum={item.commentNum}
              shoppingCartItems={item.shoppingCartItems}
              // setShoppingCartItems={item.setShoppingCartItems}
            />
          ))}
        </Box>
        <Box display="flex" justifyContent="center">
          <Link href={urls.pages.reportbuilder}>
            <Button variant="Grey-rounded" size="lg" marginBottom="20">
              View Full Report
            </Button>
          </Link>
        </Box>
      </DrawerContent>
    </Drawer>
  );
};

export default ShoppingCartView;
