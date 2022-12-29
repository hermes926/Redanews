// React Utils, UI Components
import { useNavigate, useLocation } from "react-router-dom";
import { Box, Center } from "@chakra-ui/react";

const Logo = (props) => {
  const navigate = useNavigate();
  return (
    <Center
      fontSize="24px"
      fontFamily="Zen Dots"
      color={props.color ? props.color : "white"}
      padding="1px 0 0 0"
      onClick={() => navigate("/")}
      _hover={{ cursor: "pointer" }}
    >
      RedaNews
    </Center>
  );
};

export default Logo;
