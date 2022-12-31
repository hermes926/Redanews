// React Utils, UI Components
import React, { useState, useEffect } from "react";
import {
  Box,
  Center,
  Stack,
  HStack,
  Text,
  Link,
  Divider,
} from "@chakra-ui/react";

const HistoryTable = ({ history }) => {
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
            <Box width="10%" height="10%" paddingLeft="2">
              <Text>#</Text>
            </Box>
            <Text>|</Text>
            <Box width="15%" height="10%" paddingLeft="2">
              <Text>Date</Text>
            </Box>
            <Text>|</Text>
            <Box width="45%" height="10%" paddingLeft="2">
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
              <Box key={i}>
                <Box
                  color="redanews-blue"
                  key={i}
                  height="6vh"
                  width="100%"
                  style={{ margin: "0" }}
                >
                  <Center width="100%" height="100%" px="0">
                    <HStack width="100%" spacing="0">
                      <Box
                        width="10%"
                        height="10%"
                        border="1px red"
                        paddingLeft="2"
                        margin="0"
                      >
                        <Text noOfLines={1}>{i}</Text>
                      </Box>
                      <Text>|</Text>
                      <Box width="15%" height="10%" align="center">
                        <Text>{record.newsDate}</Text>
                      </Box>
                      <Text>|</Text>
                      <Link
                        width="45%"
                        height="10%"
                        _hover={{ color: "redanews-teal" }}
                        href={record.newsLink}
                        noOfLines={1}
                        isExternal
                      >
                        {record.newsTitle}
                      </Link>
                      <Text>|</Text>
                      <Box width="10%" height="10%" noOfLines={1}>
                        {record.guessesCnt}
                      </Box>
                      <Text>|</Text>
                      <Box width="10%" height="10%" noOfLines={1}>
                        {Number(
                          ((record.correctCnt / record.guessesCnt) * 10000) /
                            100
                        ).toFixed(2) + "%"}
                      </Box>
                      <Text>|</Text>
                      <Box width="10%" height="10%" noOfLines={1}>
                        {record.avgGuess} %
                      </Box>
                    </HStack>
                  </Center>
                </Box>
              </Box>
            ))}
        </Stack>
      </Box>
    </Box>
  );
};

export default HistoryTable;
