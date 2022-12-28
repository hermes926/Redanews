import { extendTheme } from "@chakra-ui/react";
import components from "./Components";
import foundations from "./Foundations";

const theme = extendTheme({
  fonts: {
    heading: `'Montserrat', sans-serif`,
    body: `'Montserrat', sans-serif`,
  },
  borders: {
    redanews: "5px",
  },
  ...foundations,
  ...components,
});

export default theme;
