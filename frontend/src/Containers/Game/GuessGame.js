// React Utils, UI Components
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getCookie } from "../../Utils/CookieUsage";
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
import { handleGuess, countHits } from "../utils/handleGuess";
import axios from "../../api";

const GuessGame = () => {
  const navigate = useNavigate();
  const displayToast = useToast();
  const [currentGuess, setCurrentGuess] = useState("");
  const [guesses, setGuesses] = useState([]);
  const [news, setNews] = useState("");
  const [loadGuess, setLoadGuess] = useState(false);

  useEffect(() => {
    const getGuessRecord = async () => {
      const guessId = getCookie("guessId");
      if (guessId) {
        await axios.get("/guess/" + guessId).catch((e) => {
          displayToast({
            title: "Fetch Guess Record",
            status: "error",
            duration: 2000,
            isClosable: true,
          });
          navigate("/");
        }).then((res) => {
          if (res !== undefined) {
            const guessedVocabs = res.data.vocabularies;
            let guessRecord = [];
            guessedVocabs.map((vocab) => {
              const cnt = countHits(vocab, news);
              guessRecord = [...guessRecord, {
                vocab: vocab,
                count: cnt,
              }];
            })
            setGuesses(guessRecord);
            setLoadGuess(true);
          }
        })
      } else {
          setLoadGuess(true);
      } 
    }
    getGuessRecord();
  }, [news]);

  useEffect(() => {
    const getTodayNews = async () => {
      await axios.get("/news/today").catch((e) => {
        displayToast({
          title: "Fetch Today News Failed!",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
        navigate("/");
      }).then((res) => {
        if (res !== undefined) {
          setNews({
            title: res.data.title,
            content: res.data.article,
          });
        }
      })
    }
    getTodayNews();
  }, []);


  if(!loadGuess) {
    return (
      <></>
    );
  } else {
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
                      onClick={async () => {
                        const result = await handleGuess(
                          currentGuess,
                          setCurrentGuess,
                          guesses,
                          setGuesses,
                          news
                        );
                        if (result !== true) {
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
  }
};

export default GuessGame;
