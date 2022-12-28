export default {
  baseStyle: {
    fontWeight: "bold", // Normally, it is "semibold"
    border: "2px",
    borderRadius: "5px",
  },
  variants: {
    clean: {
      border: "redanews-teal",
      borderRadius: "8px",
      padding: "5px",
      _hover: { bg: "white" },
      _focus: { outline: 0 },
    },
    redanews: {
      _hover: { boxShadow: "0px 4px 0px #2E424D", filter: "brightness(99%)" },
      _focus: { outline: 0 },
    },
    "redanews-teal": {
      border: "2px solid",
      padding: "0px",
      bg: "redanews-teal",
      _hover: { boxShadow: "0px 4px 0px #18191F", bg: "primary.100" },
      _focus: { outline: 0 },
    },
    "redanews-primary": {
      bg: "primary.400",
      color: "black",
      _hover: {
        boxShadow: "0px 4px 0px #18191F",
        bg: "white",
        border: "primary.600",
      },
      _focus: { outline: 0 },
      _active: { outline: 0 },
    },
  },
};
