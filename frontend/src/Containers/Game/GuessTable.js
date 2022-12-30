// React Utils, UI Components
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Box, Stack, HStack, Text, Divider } from "@chakra-ui/react";

const GuessTable = ({ guesses, findSpan }) => {
  return (
    <Box
      width="30vw"
      height="90vh"
      bgColor="primary.700"
      align="center"
      overflowY="auto"
      sx={{
        "&::-webkit-scrollbar": {
          display: "none",
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
      <Box align="left" fontWeight="600" color="redanews-grey" py="2">
        <HStack spacing="0">
          <Box width="20%" height="10%" paddingLeft="2">
            <Text>#</Text>
          </Box>
          <Box width="60%" height="10%">
            <Text>Guess</Text>
          </Box>
          <Box width="20%" height="10%">
            Hit
          </Box>
        </HStack>
      </Box>
      <Stack spacing="0">
        {Array.from(guesses)
          .reverse()
          .map((guess, i) => (
            <Box
              key={i}
              _hover={{ bgColor: "primary.300" }}
              margin="0"
              py="1px"
            >
              <Box
                align="left"
                color="redanews-grey"
                borderTop="1px solid gray"
                key={i}
                onClick={() => findSpan(guess.vocab.toLowerCase())}
              >
                <HStack spacing="0" py="2">
                  <Box width="20%" paddingLeft="2">
                    <Text>{guesses.length - i}</Text>
                  </Box>
                  <Box width="60%">
                    <Text>{guess.vocab}</Text>
                  </Box>
                  <Box width="20%">{guess.count}</Box>
                </HStack>
              </Box>
            </Box>
          ))}
        <Text> </Text>
      </Stack>
    </Box>
  );
};

export default GuessTable;
