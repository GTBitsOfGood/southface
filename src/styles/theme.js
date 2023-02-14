import { extendTheme } from "@chakra-ui/react";
import { ButtonStyles as Button } from "./components/ButtonStyles";

export const southfaceTheme = extendTheme({
  colors: {
    primary: "#B90000",
    secondary: "#6D6E70",
    tertiary: "#00ACC8",
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
    Button,
  },
});
