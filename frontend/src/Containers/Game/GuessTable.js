// React Utils, UI Components
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Box, Stack, HStack, Text, Divider } from "@chakra-ui/react";

const GuessTable = ({ guesses }) => {
  return (
    <Box
      width="30vw"
      height="90vh"
      bgColor="primary.700"
      align="center"
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
      <Stack>
        {Array.from(guesses)
          .reverse()
          .map((guess, i) => (
            <>
              <Divider />
              <Box align="left" color="redanews-grey" key={i}>
                <HStack spacing="0" py="2">
                  <Box width="20%" height="10%" paddingLeft="2">
                    <Text>{guesses.length - i}</Text>
                  </Box>
                  <Box width="60%" height="10%">
                    <Text>{guess.vocab}</Text>
                  </Box>
                  <Box width="20%" height="10%">
                    {guess.count}
                  </Box>
                </HStack>
              </Box>
            </>
          ))}
        <Text> </Text>
      </Stack>
    </Box>
  );
};

export default GuessTable;
