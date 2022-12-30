// React Utils, UI Components
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Center,
  HStack,
  VStack,
  Flex,
  IconButton,
  useColorModeValue,
  Divider,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";
import { FiMenu } from "react-icons/fi";

// User-defined Components, Container
import Logo from "./ui/Logo";
import Info from "./Info";
import { getCookie, deleteCookie } from "../Utils/CookieUsage";

// Redanews Context Provider
import { useRedanews } from "../Hooks/useRedanews";

// Reference: https://pro.chakra-ui.com/components/marketing/navbars

// Header with a Logo and NavBar
const Header = () => {
  const navigate = useNavigate();

  const { login, logOutUser } = useRedanews();

  const [menuOpen, setMenuOpen] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);

  const InfoClick = () => {
    if (infoOpen) setInfoOpen(false);
    else setInfoOpen(true);
  };

  const MenuClick = () => {
    if (menuOpen) setMenuOpen(false);
    else setMenuOpen(true);
    // setIsLogin(getCookie("userId") !== "");
  };

  return (
    <Box
      height="10vh"
      as="nav"
      bg="bg-surface"
      boxShadow={useColorModeValue("sm", "sm-dark")}
      backgroundColor="redanews"
    >
      <Container
        py={{
          base: "2",
          lg: "3",
        }}
        maxW="90%"
        px="0"
        height="100%"
      >
        <HStack justify="space-between" align="center" height="100%">
          <Flex justify="space-between" flex="1" height="100%">
            <Logo />
            <HStack spacing="3">
              <IconButton
                height="100%"
                variant="none"
                icon={<FiMenu fontSize="1.25rem" color="white" />}
                aria-label="Open Menu"
                onClick={MenuClick}
              />
              {/*this is for Menu*/}
              <Drawer isOpen={menuOpen} placement="right" onClose={MenuClick}>
                <DrawerOverlay />
                <DrawerContent>
                  <DrawerCloseButton />
                  <DrawerHeader>
                    <Center w="100%">Menu</Center>
                  </DrawerHeader>
                  <Divider colorScheme="redanews" />
                  <DrawerBody>
                    <VStack spacing="30px" h="100%" pt="5px">
                      {/*<Button w='90%' variant='link' onClick={()=>{MenuClick(); navigate("/")}}>MainPage</Button>*/}
                      <Button w="90%" variant="link" onClick={InfoClick}>
                        Info
                      </Button>
                      <Info infoOpen={infoOpen} InfoClick={InfoClick} />
                      <Button
                        w="90%"
                        variant="link"
                        onClick={() => {
                          navigate("/account/");
                          MenuClick();
                        }}
                      >
                        Profile
                      </Button>
                      <Button
                        w="90%"
                        variant="link"
                        onClick={() => {
                          navigate("/account/history");
                          MenuClick();
                        }}
                      >
                        History
                      </Button>
                    </VStack>
                  </DrawerBody>

                  <DrawerFooter>
                    {login ? (
                      <Button
                        variant="outline"
                        mr={3}
                        onClick={() => {
                          MenuClick();
                          navigate("/");
                          logOutUser();
                        }}
                      >
                        Logout
                      </Button>
                    ) : (
                      <Button
                        colorScheme="blue"
                        onClick={() => {
                          MenuClick();
                          navigate("/login");
                        }}
                      >
                        Login
                      </Button>
                    )}
                  </DrawerFooter>
                </DrawerContent>
              </Drawer>
            </HStack>
          </Flex>
        </HStack>
      </Container>
    </Box>
  );
};

export default Header;
