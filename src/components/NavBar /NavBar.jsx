import {
  Box,
  Button,
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { BiBookBookmark as ShoppingCartIcon } from "react-icons/bi";
import SectionSeperator from "./SectionSeperator";
import ShoppingCartItem from "./ShoppingCartItem";

const NavBar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [shoppingCartItems, setShoppingCartItems] = React.useState([
    { planName: "Ladder T-walls", imageNum: 2, commentNum: 8 },
    { planName: "Ladder T-walls", imageNum: 3, commentNum: 6 },
    { planName: "Ladder T-walls", imageNum: 1, commentNum: 2 },
    { planName: "Ladder T-walls", imageNum: 4, commentNum: 5 },
    { planName: "Ladder T-walls", imageNum: 6, commentNum: 7 },
  ]);

  const handleClose = () => {
    onClose();
    setShoppingCartItems(shoppingCartItems.slice(1));
  };

  return (
    <div>
      <nav>
        <div style={NavBarContainer}>
          <div style={NavBarElement}>Digital Library</div>
          <div style={NavBarElement}>Project Plan Builder</div>
          <div style={NavBarElementCart}>
            <IconButton onClick={onOpen} icon={<ShoppingCartIcon />} />
            <div style={NavBarElement}>Logout</div>
          </div>
        </div>
      </nav>

      <Drawer isOpen={isOpen} onClose={handleClose}>
        <DrawerOverlay />
        <DrawerContent justifyContent="space-between">
          <Box>
            <DrawerHeader display="flex" justifyContent="center">
              Atlanta Construction 47
            </DrawerHeader>
            <SectionSeperator />
            <ui>
              {shoppingCartItems.slice(0, 3).map((item, index) => (
                <ShoppingCartItem
                  key={index}
                  planName={item.planName}
                  imageNum={item.imageNum}
                  commentNum={item.commentNum}
                />
              ))}
            </ui>
          </Box>
          <Box display="flex" justifyContent="center">
            <Button
              onClick={handleClose}
              background="#6D6E70"
              borderRadius="32px"
              color="white"
              marginBottom="20"
            >
              View Full Plan
            </Button>
          </Box>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

const NavBarContainer = {
  marginTop: "20px",
  paddingLeft: "50px",
  paddingRight: "50px",
  background: "#6D6E70",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  color: "white",
  fontWeight: "bold",
};

const NavBarElement = {
  padding: "10px",
};

const NavBarElementCart = {
  display: "flex",
  alignItems: "center",
};

export default NavBar;
