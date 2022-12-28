import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Flex,
  Box,
  Stack,
  HStack,
  Center,
  Divider,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightElement,
  IconButton,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import Paragraph from "./Paragraph";
import GuessTable from "./GuessTable";

const GuessGame = () => {
  const handleGuess = () => {};
  return (
    <Box height="90vh" width="100vw" align="center">
      <HStack height="100%" width="100%" spacing="0">
        <Box width="70%" height="100%" bgColor="redanews-black">
          <Stack height="100%" width="100%">
            <Paragraph />
            <Center width="100%" height="12%" bgColor="primary.700">
              <InputGroup width="40%" padding="0">
                <InputLeftAddon variant="link" children="Top" />
                <Input
                  type="tel"
                  placeholder="Guess a Word"
                  focusBorderColor="redanews-grey"
                  _focus={{ borderColor: "gray.700" }}
                />
                <InputRightElement>
                  <IconButton
                    onClick={handleGuess}
                    icon={<AddIcon />}
                    variant="link"
                    color="white"
                    border="none"
                    _focus={{
                      bg: "gray.100",
                      border: "none",
                      borderRadius: "full",
                    }}
                    marginRight="10px"
                    paddingY="2px"
                    fontSize="md"
                    isRound
                  />
                </InputRightElement>
              </InputGroup>
            </Center>
          </Stack>
        </Box>
        <GuessTable />
      </HStack>
    </Box>
  );
};

export default GuessGame;
