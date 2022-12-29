// React Utils, UI Components
import { useState } from "react";
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
import Account from './Account'
import {useScoreCard} from '../hooks/useScoreCard'

// Reference: https://pro.chakra-ui.com/components/marketing/navbars

// Header with a Logo and NavBar
const Header = () => {
  const {isLogin, setIsLogin} = useScoreCard();
  const [menuOpen, setMenuOpen] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);
  const navigate = useNavigate();

  const InfoClick = () => {
    if (infoOpen) setInfoOpen(false);
    else setInfoOpen(true);
  };

  const MenuClick = () => {
    if (menuOpen) setMenuOpen(false);
    else setMenuOpen(true);
  };
  //console.log(isLogin)

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
                      <Button w='90%' variant='link' onClick={()=>{MenuClick(); navigate("/")}}>MainPage</Button>
                      {(isLogin)? (<>
                      <Button w='90%' variant='link' onClick={()=>{MenuClick(); navigate("/game")}}>Game</Button>
                      <Button variant="link" onClick={InfoClick}>
                        Info
                      </Button>
                      <Info infoOpen={infoOpen} InfoClick={InfoClick} />
                      <Button variant="link">
                        Stats
                      </Button>
                      <Button variant="link">
                        History
                      </Button>
                      <Center>
                        <Account navigate={navigate} MenuClick={MenuClick}/>
                      </Center>
                      </>) : <></>}
                    </VStack>
                  </DrawerBody>

                  <DrawerFooter>
                    <Button
                      variant="outline"
                      mr={3}
                      onClick={() => {
                        MenuClick();
                        navigate("/");
                        //setIsLogin(false)
                      }}
                    >
                      Logout
                    </Button>
                    <Button
                      colorScheme="blue"
                      onClick={() => {
                        MenuClick();
                        navigate("/login");
                      }}
                    >
                      Login
                    </Button>
                  </DrawerFooter>
                </DrawerContent>
              </Drawer>
              {/*this is for Menu*/}
              {/*isLogin ? (
                <></>
              ) : (
                <Button borderRadius="10px">
                  Sign in{" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-arrow-right"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
                    />
                  </svg>
                </Button>
              )*/}
            </HStack>
          </Flex>
        </HStack>
      </Container>
    </Box>
  );
};

export default Header;
