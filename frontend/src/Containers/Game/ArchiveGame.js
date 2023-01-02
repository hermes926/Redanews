// React Utils, UI Components
import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Stack,
  HStack,
  Center,
  Heading,
  Text,
  useToast,
} from "@chakra-ui/react";
import styled from "@emotion/styled";

// User-defined Components, Container
import GuessTable from "./GuessTable";

// Functions, Utils
import { countHits } from "../utils/handleGuess";
import viewHistoryRecord from "../utils/viewHistory";
import axios from "../../api";

const TopRef = styled.div`
  height: 1px;
`;

const ArchiveGame = () => {
  const navigate = useNavigate();
  const displayToast = useToast();

  const { newsId, guessId } = useParams();
  const [news, setNews] = useState({});
  const [guesses, setGuesses] = useState([]);
  const [preClickGuess, setPreClickGuess] = useState("");
  const [preSpans, setPreSpans] = useState([]);
  const [currentFocus, setCurrentFocus] = useState(0);

  const [loadGuess, setLoadGuess] = useState(false);

  useEffect(() => {
    const getGuessRecord = async () => {
      if (guessId !== "" && news) {
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
        if (news) {
          setLoadGuess(true);
        }
      }
    };
    getGuessRecord();
  }, [news]);

  useEffect(() => {
    const getNews = async () => {
      await axios
        .get("/news/all/" + newsId)
        .catch((e) => {
          displayToast({
            title: "Fetch News Failed!",
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
    getNews();
  }, []);

  const topRef = useRef(null);
  const tableTopRef = useRef(null);

  // Func: Remove styles added for pre-click word
  const clearStyle = () => {
    Array.from(document.getElementsByClassName(preClickGuess)).forEach(
      (element) => {
        element.style.cssText = "";
      }
    );
  };

  // Func: for find all words same as the guess word to highlight
  const findSpan = async (word) => {
    if (word === undefined || word === "") {
      return;
    }

    let toFocus = 0;
    let elements = preSpans;

    // Check pre-clicking or not
    if (word.toLowerCase() === preClickGuess) {
      toFocus = currentFocus + 1;
      if (elements.length === 0) {
        return;
      }
      elements[
        elements.length === 1 ? 0 : toFocus % elements.length
      ].style.cssText = "color:black;background-color:aqua;";
      if (elements.length !== 1) {
        elements[(toFocus - 1) % elements.length].style.cssText =
          "color:black;background-color:gray;";
      }
    } else {
      clearStyle();

      elements = Array.from(document.getElementsByClassName(word));
      setPreSpans(elements);
      elements.forEach((element, i) => {
        if (i === 0) {
          element.style.cssText += "color:black;background-color:aqua;";
        } else {
          element.style.cssText += "color:black;background-color:gray;";
        }
      });
    }

    setCurrentFocus(toFocus);
    setPreClickGuess(word.toLowerCase());

    if (elements !== []) {
      elements[toFocus % elements.length]?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  useEffect(() => {
    tableTopRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, [guesses]);

  if (!loadGuess) {
    return <></>;
  } else {
    return (
      <Box height="90vh" width="100vw" align="center">
        <HStack height="100%" width="100%" spacing="0">
          <Box width="70%" height="100%" bgColor="redanews-black">
            <Stack height="100%" width="100%">
              <Stack
                width="100%"
                height="88%"
                spacing="2"
                overflowY="auto"
                sx={{
                  "&::-webkit-scrollbar": {
                    width: "16px",
                    borderRadius: "8px",
                    backgroundColor: `rgba(0, 0, 0, 0.05)`,
                  },
                  "&::-webkit-scrollbar-thumb": {
                    backgroundColor: `rgba(0, 0, 0, 0.05)`,
                  },

                  "&::-webkit-scrollbar-track": {
                    width: "6px",
                  },
                }}
              >
                <TopRef ref={topRef} />
                <Heading
                  color="redanews-word-grey"
                  lineHeight="1.5"
                  px="5"
                  pt="2"
                  align="left"
                >
                  {viewHistoryRecord(guesses, news.title)}
                </Heading>
                <Text
                  color="redanews-word-grey"
                  fontSize="lg"
                  px="5"
                  align="left"
                  as="samp"
                  whiteSpace="pre-line"
                >
                  {viewHistoryRecord(guesses, news.content)}
                </Text>
              </Stack>
              <Center
                width="100%"
                height="12%"
                color="white"
                bgColor="primary.700"
              >
                Viewing Previous Game
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

export default ArchiveGame;
