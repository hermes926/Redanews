// React Utils, UI Components
import React, { useState, useEffect, useRef } from "react";
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

// User-defined Components, Container
import Paragraph from "../../Components/Paragraph";
import GuessTable from "./GuessTable";

// Functions, Utils
import { handleGuess, countHits } from "../utils/handleGuess";
import { getCookie } from "../../Utils/CookieUsage";
import axios from "../../api";

// Redanews Context Provider
import { useRedanews } from "../../Hooks/useRedanews";

const GuessGame = () => {
  const navigate = useNavigate();
  const displayToast = useToast();

  const { guesses, news, win, setGuesses, setWin, setNews, difficulty } =
    useRedanews();
  const [currentGuess, setCurrentGuess] = useState("");
  const [preClickGuess, setPreClickGuess] = useState("");
  const [currentFocus, setCurrentFocus] = useState(0);

  const [loadGuess, setLoadGuess] = useState(false);

  const submitGuess = async () => {
    const result = await handleGuess(
      currentGuess,
      setCurrentGuess,
      guesses,
      setGuesses,
      news
    );
    if (result !== true) {
      if (result.description.includes("has already been guessed")) {
        findSpan(currentGuess);
      }
      displayToast(result);
      setPreClickGuess("");
    } else {
      findSpan(currentGuess);
      tableTopRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  useEffect(() => {
    const getGuessRecord = async () => {
      const guessId = getCookie("guessId");
      if (guessId && news) {
        await axios
          .get("/guess/" + guessId)
          .catch((e) => {
            displayToast({
              title: "Fetch Guess Record",
              status: "error",
              duration: 2000,
              isClosable: true,
            });
            navigate("/");
          })
          .then((res) => {
            if (res !== undefined) {
              const guessedVocabs = res.data.vocabularies;
              let guessRecord = [];
              guessedVocabs.map((vocab) => {
                const cnt = countHits(vocab, news);
                guessRecord = [
                  ...guessRecord,
                  {
                    vocab: vocab,
                    count: cnt,
                  },
                ];
              });
              setGuesses(guessRecord);
              setLoadGuess(true);
            }
          });
      } else {
        if (news) setLoadGuess(true);
      }
    };
    getGuessRecord();
  }, [news]);

  useEffect(() => {
    if (win) {
      displayToast({
        title: "Correct Answer",
        description: "You've guessed the news correctly! ",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    }
  }, [win]);

  useEffect(() => {
    const getTodayNews = async () => {
      await axios
        .get("/news/today")
        .catch((e) => {
          displayToast({
            title: "Fetch Today News Failed!",
            status: "error",
            duration: 2000,
            isClosable: true,
          });
          navigate("/");
        })
        .then((res) => {
          if (res !== undefined) {
            setNews({
              title: res.data.title,
              content: res.data.article,
            });
          }
        });
    };
    getTodayNews();
  }, []);

  const topRef = useRef(null);
  const tableTopRef = useRef(null);

  const scrollToTop = () => {
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const clearStyle = () => {
    Array.from(document.getElementsByTagName("span")).forEach((element) => {
      element.style.cssText = "";
    });
  };

  const findSpan = (word) => {
    clearStyle();
    let toFocus = 0;
    if (word === preClickGuess) {
      toFocus = currentFocus + 1;
    }

    setCurrentFocus(toFocus);
    setPreClickGuess(word);

    const elements = Array.from(document.getElementsByClassName(word));
    elements.forEach((element, i) => {
      if (toFocus % elements.length === i) {
        element.style.cssText += "color:black;background-color:aqua;";
      } else {
        element.style.cssText += "color:black;background-color:gray;";
      }
    });
    elements[toFocus % elements.length].current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

  if (!loadGuess) {
    return <></>;
  } else {
    return (
      <Box height="90vh" width="100vw" align="center">
        <HStack height="100%" width="100%" spacing="0">
          <Box width="70%" height="100%" bgColor="redanews-black">
            <Stack height="100%" width="100%">
              <Paragraph
                news={news}
                win={win}
                guesses={guesses}
                difficulty={difficulty}
                topRef={topRef}
              />
              <Center width="100%" height="12%" bgColor="primary.700">
                <InputGroup width="40%" minW="300px" padding="0">
                  <InputLeftAddon
                    as="button"
                    variant="link"
                    children="Top"
                    onClick={scrollToTop}
                  />
                  <Input
                    type="string"
                    value={currentGuess}
                    onChange={(e) => {
                      setCurrentGuess(e.target.value);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        submitGuess();
                      }
                    }}
                    color="white"
                    placeholder="Guess a Word"
                    focusBorderColor="redanews-grey"
                    _focus={{ borderColor: "gray.700" }}
                  />
                  <InputRightElement>
                    <IconButton
                      aria-label="Send Guess"
                      colorScheme="transparent"
                      color="white"
                      fontSize="md"
                      icon={<AddIcon />}
                      _hover={{ bgColor: "primary.200" }}
                      onClick={submitGuess}
                    />
                  </InputRightElement>
                </InputGroup>
              </Center>
            </Stack>
          </Box>
          <GuessTable
            guesses={guesses}
            tableTopRef={tableTopRef}
            findSpan={findSpan}
          />
        </HStack>
      </Box>
    );
  }
};

export default GuessGame;
