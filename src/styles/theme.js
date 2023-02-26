import { extendTheme } from "@chakra-ui/react";
import { ButtonStyles } from "./components/ButtonStyles";

export const southfaceTheme = extendTheme({
  textStyles: {
    h1: {
      textTransform: "capitalize",
      fontColor: "red",
    },
    h2: {
      fontColor: "red",
    },
    p: {
      fontColor: "red",
    },
  },
  colors: {
    // red
    red: "#B90000",
    darkRed: "#8C0000",
    darkestRed: "#7E0000",

    // blue
    blue: "#00ACC8",
    darkBlue: "#007A8F",
    darkestBlue: "#006779",

    // grey
    grey: "#6D6E70",
    darkGrey: "#3F3F3F",
    darkestGrey: "#2D2C2C",
  },
  fonts: {
    body: "Inter, sans-serif",
    heading: "Inter, sans-serif",
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
});
