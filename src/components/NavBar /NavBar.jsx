import { Modal, ModalContent } from "@chakra-ui/react";
import React, { useState } from "react";
import SectionSeperator from "./SectionSeperator";
import ShoppingCartIcon from "./ShoppingCartIcon";
import ShoppingCartItem from "./ShoppingCartItem";

const NavBar = () => {
  const [sidebar, setSidebar] = useState(false);

  const toggleSidebar = () => {
    setSidebar((prevState) => !prevState);
  };

  const NavBarContainer = {
    marginTop: "20px",
    margineLeft: " 0",
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

  const sidebarContainer = {
    width: "400px",
    height: "100vh",
    float: "right",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  };

  const sidebarTitle = {
    padding: "15px",
    fontWeight: "bold",
    fontSize: "3vh",
  };

  const exitButton = {
    background: "#6D6E70",
    borderRadius: "32px",
    padding: "15px",
    fontWeight: "bold",
    color: "white",
    marginBottom: "20px",
  };

  return (
    <div>
      <nav>
        <div style={NavBarContainer}>
          <div style={NavBarElement}>Digital Library</div>
          <div style={NavBarElement}>Project Plan Builder</div>
          <div style={NavBarElementCart}>
            <button onClick={toggleSidebar}>
              <ShoppingCartIcon></ShoppingCartIcon>
            </button>
            <div style={NavBarElement}>Logout</div>
          </div>
        </div>
      </nav>

      {sidebar && (
        <Modal isOpen={sidebar} onClose={sidebar} isCentered size="4xl">
          <ModalContent style={sidebarContainer}>
            <div>
              <div style={sidebarTitle}>Atlanta Construction 47</div>
              <SectionSeperator />
              <ui>
                <ShoppingCartItem
                  planName={"Ladder T-walls"}
                  num1={2}
                  num2={8}
                ></ShoppingCartItem>
                <ShoppingCartItem
                  planName={"Ladder T-walls"}
                  num1={3}
                  num2={6}
                ></ShoppingCartItem>
                <ShoppingCartItem
                  planName={"Ladder T-walls"}
                  num1={1}
                  num2={2}
                ></ShoppingCartItem>
              </ui>
            </div>

            <div>
              <button style={exitButton} onClick={toggleSidebar}>
                View Full Plan
              </button>
            </div>
          </ModalContent>
        </Modal>
      )}
    </div>
  );
};

export default NavBar;
