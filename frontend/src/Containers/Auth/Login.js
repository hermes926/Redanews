// React Utils, UI Components
import { Flex, Box } from "@chakra-ui/react";

// User-defined Components, Container
import LoginModal from "./LoginModal";

const Login = () => {
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
