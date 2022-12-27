import { extendTheme } from "@chakra-ui/react";
import Components from "./Components";

const theme = extendTheme({
  fonts: {
    heading: `'Montserrat', sans-serif`,
    body: `'Montserrat', sans-serif`,
  },
  colors: {
    primary: "#2E424D",
    transparent: "transparent",
    black: "#000",
    white: "#fff",
    blue: {
      700: "#2C5282",
      800: "#2A4365",
      900: "#1A365D",
    },
  },
  Components,
});

export default theme;
