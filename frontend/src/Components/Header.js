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
import Difficulty from "./Difficulty";
import DrawerButton from "./ui/DrawerButton";

// Functions, Utils
import { getCookie } from "../Utils/CookieUsage";
import fetchUser from "../Containers/utils/fetchUser";

// Redanews Context Provider
import { useRedanews } from "../Hooks/useRedanews";

// Ref for Header: https://pro.chakra-ui.com/components/marketing/navbars

// Header with a Logo and NavBar
const Header = () => {
  const navigate = useNavigate();

  const {
    login,
    load,
    setLoad,
    loginUser,
    logOutUser,
    difficulty,
    setDifficulty,
  } = useRedanews();

  const [menuOpen, setMenuOpen] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);
  const [difficultyOpen, setDifficultyOpen] = useState(false);

  const InfoClick = () => {
    document.getElementById("drawer_button_Info").blur();
    if (infoOpen) setInfoOpen(false);
    else setInfoOpen(true);
  };

  const MenuClick = () => {
    if (menuOpen) setMenuOpen(false);
    else setMenuOpen(true);
    // setIsLogin(getCookie("userId") !== "");
  };

  useEffect(() => {
    if (!load) {
      const id = getCookie("userId");
      if (id !== "" && id != "undefined") {
        fetchUser(id, loginUser);
      }
      setLoad(true);
    }
  }, [load]);

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
              <Drawer
                w="100%"
                isOpen={menuOpen}
                placement="right"
                onClose={MenuClick}
              >
                <DrawerOverlay />
                <DrawerContent>
                  <DrawerCloseButton />
                  <DrawerHeader>
                    <Center w="100%">Menu</Center>
                  </DrawerHeader>
                  <Divider colorScheme="redanews" />
                  <DrawerBody w="100%" px="0" py="0">
                    <VStack h="100%" spacing="0">
                      <DrawerButton onClickFn={InfoClick} text="Info" />
                      <Info infoOpen={infoOpen} InfoClick={InfoClick} />
                      {login ? (
                        <>
                          <DrawerButton
                            onClickFn={() => {
                              navigate("/account/");
                              MenuClick();
                            }}
                            text="Profile"
                          />
                          <DrawerButton
                            onClickFn={() => {
                              navigate("/account/history");
                              MenuClick();
                            }}
                            text="History"
                          />
                        </>
                      ) : null}
                      <DrawerButton
                        onClickFn={() => {
                          if (difficultyOpen) {
                            document
                              .getElementById("drawer_button_Difficulty")
                              .blur();
                          }
                          setDifficultyOpen(!difficultyOpen);
                        }}
                        text="Difficulty"
                      />
                      {difficultyOpen ? (
                        <Difficulty
                          difficulty={difficulty}
                          setDifficulty={setDifficulty}
                        />
                      ) : null}
                    </VStack>
                  </DrawerBody>

                  <DrawerFooter
                    display="flex"
                    justifyContent="space-around"
                    _focus={{ backgroundColor: "red" }}
                  >
                    <Button
                      colorScheme="facebook"
                      onClick={() => {
                        MenuClick();
                        navigate("/game");
                      }}
                    >
                      Play Game
                    </Button>
                    {login ? (
                      <Button
                        colorScheme="facebook"
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
                        colorScheme="facebook"
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
