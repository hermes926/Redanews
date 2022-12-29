import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Flex,
  IconButton,
  useBreakpointValue,
  useColorModeValue,
  Input,
  Badge,
  Text,
  Divider,
} from "@chakra-ui/react";
import * as React from "react";
import { FiMenu } from "react-icons/fi";
import Logo from "./ui/Logo";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from '@chakra-ui/react'
import {useState} from 'react'
import { Stack, HStack, VStack } from '@chakra-ui/react'
import { Center, Square, Circle } from '@chakra-ui/react'

// Reference: https://pro.chakra-ui.com/components/marketing/navbars

const Header = () => {
  const signIn = true;
  const [menuOpen, setMenuOpen] = useState(false)
  const [isLogin, setIsLogin] = useState(false)

  const MenuClick=()=> {
    if(menuOpen)
      setMenuOpen(false)
    else
      setMenuOpen(true)
  }

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
              <Drawer                                          
                isOpen={menuOpen}
                placement='right'
                onClose={MenuClick}
              >
                <DrawerOverlay />
                <DrawerContent>
                  <DrawerCloseButton />
                  <DrawerHeader><Center w="100%">Menu</Center><Divider colorScheme='redanews'/></DrawerHeader>

                  <DrawerBody>
                    <VStack spacing='20px' h='100%'>
                      <Box>Info</Box>
                      <Box>Stats</Box>
                      <Box>History</Box>
                    </VStack>
                  </DrawerBody>

                  <DrawerFooter>
                    <Button variant='outline' mr={3}>
                      Logout
                    </Button>
                    <Button colorScheme='blue'>Login</Button>
                  </DrawerFooter>
                </DrawerContent>
              </Drawer>        
              {/*this is for Menu*/}                               
              {signIn ? (
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
              )}
            </HStack>
          </Flex>
        </HStack>
      </Container>
    </Box>
  );
};

export default Header;
