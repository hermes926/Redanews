// React Utils, UI Components
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Center, Stack, HStack, Text, Button } from "@chakra-ui/react";

import Record from "./Record";

const HistoryTable = ({ history }) => {
  const navigate = useNavigate();
  const [recordOpen, setRecordOpen] = useState(false);

  const recordOpenClick = () => {
    if (recordOpen) setRecordOpen(false);
    else setRecordOpen(true);
  };

  const [index, setIndex] = useState(0);

  // Parsing today's date
  var today = new Date();
  today.setDate(today.getDate() - 1);
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0");
  var yyyy = today.getFullYear();
  today = yyyy + "-" + mm + "-" + dd;

  return (
    <Box width="80vw" borderRadius="10px" bgColor="primary.300" align="center">
      <Box
        width="100%"
        height="8vh"
        align="center"
        color="white"
        fontSize="md"
        fontWeight="600"
      >
        <Center width="100%" height="100%" px="0">
          <HStack width="100%" spacing="auto">
            <Box width="15%" height="10%" paddingLeft="2">
              <Text>Date</Text>
            </Box>
            <Text>|</Text>
            <Box width="55%" height="10%" paddingLeft="2">
              <Text>News Title</Text>
            </Box>
            <Text>|</Text>
            <Box width="10%" height="10%" noOfLines={1}>
              <Text>Guesses</Text>
            </Box>
            <Text>|</Text>
            <Box width="10%" height="10%" noOfLines={1}>
              <Text>Accuracy</Text>
            </Box>
            <Text>|</Text>
            <Box width="10%" height="10%" noOfLines={1}>
              <Text>Average</Text>
            </Box>
          </HStack>
        </Center>
      </Box>
      <Box
        maxH="60vh"
        borderBottomRadius="10px"
        bgColor="white"
        overflowY="auto"
        position="relative"
        sx={{
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        <Stack>
          {Array.from(history)
            .reverse()
            .map((record, i) => (
              <Box
                color="redanews-blue"
                key={i}
                height="6vh"
                width="100%"
                style={{ margin: "0" }}
              >
                <Center width="100%" height="100%" px="0">
                  <HStack width="100%" spacing="0">
                    <Box width="15%" height="10%" align="center">
                      <Text>{record.newsDate}</Text>
                    </Box>
                    <Text>|</Text>
                    <Button
                      width="55%"
                      height="10%"
                      variant="link"
                      color={
                        today !== record.newsDate || today.win === true
                          ? "gray.400"
                          : "redanews-blue"
                      }
                      _hover={
                        today !== record.newsDate || today.win === true
                          ? { color: "redanews-grey" }
                          : { color: "redanews-teal" }
                      }
                      onClick={() => {
                        if (today !== record.newsDate || today.win === true) {
                          recordOpenClick();
                          setIndex(history.length - 1 - i);
                        } else {
                          navigate("/game");
                        }
                      }}
                      noOfLines={1}
                    >
                      {today !== record.newsDate || today.win === true
                        ? record.newsTitle
                        : "You still have time, keep guessing → "}
                    </Button>
                    <Text>|</Text>
                    <Box width="10%" height="10%" noOfLines={1}>
                      {record.guessesCnt}
                    </Box>
                    <Text>|</Text>
                    <Box width="10%" height="10%" noOfLines={1}>
                      {Number(
                        ((record.correctCnt / record.guessesCnt) * 10000) / 100
                      ).toFixed(2) + "%"}
                    </Box>
                    <Text>|</Text>
                    <Box width="10%" height="10%" noOfLines={1}>
                      {record.avgGuess} %
                    </Box>
                  </HStack>
                </Center>
              </Box>
            ))}
        </Stack>

        {
          <Record
            history={history[index]}
            recordOpen={recordOpen}
            recordOpenClick={recordOpenClick}
          />
        }
      </Box>
    </Box>
  );
};

export default HistoryTable;
