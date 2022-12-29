// React Utils, UI Components
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Flex,
  Box,
  Stack,
  HStack,
  Center,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightElement,
  IconButton,
  useToast,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";

// Functions, Utils
import Paragraph from "../../Components/Paragraph";
import GuessTable from "./GuessTable";

// Functions, Utils
import handleGuess from "../utils/handleGuess";
import { news } from "../utils/variables";

const GuessGame = () => {
  const displayToast = useToast();
  const [currentGuess, setCurrentGuess] = useState("");
  const [guesses, setGuesses] = useState([]);

  return (
    <Box height="90vh" width="100vw" align="center">
      <HStack height="100%" width="100%" spacing="0">
        <Box width="70%" height="100%" bgColor="redanews-black">
          <Stack height="100%" width="100%">
            <Paragraph news={news} guesses={guesses} />
            <Center width="100%" height="12%" bgColor="primary.700">
              <InputGroup width="40%" minW="300px" padding="0">
                <InputLeftAddon variant="link" children="Top" />
                <Input
                  type="string"
                  value={currentGuess}
                  onChange={(e) => {
                    setCurrentGuess(e.target.value);
                  }}
                  color="white"
                  placeholder="Guess a Word"
                  focusBorderColor="redanews-grey"
                  _focus={{ borderColor: "gray.700" }}
                />
                <InputRightElement>
                  <IconButton
                    onClick={() => {
                      const result = handleGuess(
                        currentGuess,
                        setCurrentGuess,
                        guesses,
                        setGuesses
                      );
                      if (result != true) {
                        displayToast(result);
                      }
                    }}
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
        <GuessTable guesses={guesses} />
      </HStack>
    </Box>
  );
};

export default GuessGame;
