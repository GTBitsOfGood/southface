import { IconButton, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import { BiBookBookmark as ShoppingCartIcon } from "react-icons/bi";
import ShoppingCartView from "../ShoppingCartView";

const NavBar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [shoppingCartItems] = useState([
    { planName: "Ladder T-walls", imageNum: 2, commentNum: 8 },
    { planName: "Ladder T-walls", imageNum: 3, commentNum: 6 },
    { planName: "Ladder T-walls", imageNum: 1, commentNum: 2 },
    { planName: "Ladder T-walls", imageNum: 4, commentNum: 5 },
    { planName: "Ladder T-walls", imageNum: 6, commentNum: 7 },
  ]);

  const handleClose = () => {
    onClose();
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

      <ShoppingCartView
        isOpen={isOpen}
        onClose={handleClose}
        shoppingCartItems={shoppingCartItems}
      />
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
