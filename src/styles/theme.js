import { extendTheme } from "@chakra-ui/react";
import { ButtonStyles } from "./components/ButtonStyles";

export const southfaceTheme = extendTheme({
  colors: {
    // Red
    Red: "#B90000",
    darkRed: "#8C0000",
    darkestRed: "#7E0000",

    // Blue
    Blue: "#00ACC8",
    darkBlue: "#007A8F",
    darkestBlue: "#006779",

    // Grey
    lightGrey: "#8C8D8F",
    Grey: "#6D6E70",
    darkGrey: "#3F3F3F",
    darkestGrey: "#2D2C2C",
    boldGrey: "#515254",
  },
  fonts: {
    body: "Roboto Slab",
    headingBold: `'Europa-Bold', sans-serif`,
    heading: `'Europa-Regular', sans-serif`,
    regular: "400",
    bold: "700",
    heavyBold: "800",
  },
  breakpoints: {
    xl: "1200px",
    "2xl": "1536px",
  },
  components: {
    Button: ButtonStyles,
    Heading: {
      baseStyle: {
        textTransform: "capitalize",
        whiteSpace: "trim",
      },
    },
    Text: {
      baseStyle: {
        "::first-letter": {
          textTransform: "uppercase",
        },
        whiteSpace: "trim",
      },
    },
  },
  heading: {
    customTheme: {
      fontFamily: "body",
      fontSize: "24px",
      fontWeight: "bold",
      color: "boldGrey",
      lineHeight: "31.65px",
    },
  },
  textStyles: {
    // CategoryCard.jsx styles
    primaryText: {
      fontWeight: "heavyBold",
      color: "boldGrey",
      fontFamily: "headingBold",
      fontSize: "50px",
      letterSpacing: "-2px",
    },
    secondaryText: {
      fontSize: "17px",
      fontWeight: "regular",
      fontFamily: "heading",
      color: "Grey",
      lineHeight: "20px",
    },

    // StandardCard.jsx
    primaryTextStandard: {
      fontFamily: "body",
      fontSize: "24px",
      fontWeight: "bold",
      color: "boldGrey",
      lineHeight: "31.65px",
    },
    secondaryTextStandard: {
      fontFamily: "heading",
      fontSize: "12px",
      fontWeight: "regular",
      color: "Grey",
      lineHeight: "12px",
    },

    // NavBar Sign In
    name: {
      fontWeight: "400",
      fontStyle: "normal",
      headingBold: `'Europa-Regular', sans-serif`,
      color: "#6D6E70",
      fontSize: "16px",
    },
    nameBold: {
      fontWeight: "700",
      headingBold: `'Europa-Bold', sans-serif`,
      color: "#6D6E70",
      fontSize: "16px",
    },

    // Search text
    search: {
      fontWeight: "400",
      fontFamily: "'Europa-Regular', sans-serif",
      color: "#6D6E70",
    },

    searchBox: {
      fontWeight: "300",
      fontFamily: "'Europa-Light', sans-serif",
      color: "#6D6E70",
      fontSize: "16px",
    },
  },
});
