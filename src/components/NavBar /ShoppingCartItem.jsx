import React, { useState } from "react";
import SectionSeperator from "./SectionSeperator";

const ShoppingCartItem = ({ planName, num1, num2 }) => {
  const [hasCartItem, removeCartItem] = useState(true);

  const toggleRemovebtn = () => {
    removeCartItem(false);
  };

  const imageURL =
    "https://user-images.githubusercontent.com/69729390/214123449-126291c9-2cde-4773-90b7-a54a38336553.png";

  const itemContainer = {
    display: "flex",
    flexDirection: "row",
    margin: "20px",
    flex: 1,
  };

  const imageContainer = {
    flex: 1,
  };

  const contentContainer = {
    flex: 1.8,
    paddingLeft: "10px",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "space-between",
  };

  const planHeader = {
    fontSize: "24px",
    fontWeight: "700",
    fontStyle: "normal",
  };

  const removebtn = {
    backgroundColor: "#B90000",
    borderRadius: "20px",
    padding: "8px",
    color: "white",
    fontSize: "10px",
    fontWeight: "bold",
  };

  return (
    hasCartItem && (
      <div>
        <div style={itemContainer}>
          <div style={imageContainer}>
            <img src={imageURL} alt="Logo" layout="fill" />
          </div>
          <div style={contentContainer}>
            <div style={planHeader}>{planName}</div>
            <div>
              {num1} images * {num2} comments
            </div>
            <button style={removebtn} onClick={toggleRemovebtn}>
              Remove from project plan
            </button>
          </div>
        </div>
        <SectionSeperator />
      </div>
    )
  );
};

export default ShoppingCartItem;
