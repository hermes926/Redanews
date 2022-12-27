import { Flex, Stack, Box, useColorModeValue } from "@chakra-ui/react";
import { useNavigate, useLocation } from "react-router-dom";

import LoginModal from "./LoginModal";

const Login = () => {
  const navigate = useNavigate();
  return (
    <Flex height="90vh" align="center" justify="center">
      <Box
        backgroundImage="https://cdn.pixabay.com/photo/2019/02/10/19/30/newspaper-3988054_1280.jpg"
        width="100%"
        height="90vh"
        opacity="0.1"
        position="absolute"
      />
      <LoginModal />
    </Flex>
  );
};

export default Login;
