// React Utils, UI Components
import React, { useState, useEffect } from "react";
import { Box, Stack, Heading, Text } from "@chakra-ui/react";

// Functions, Utils
import redact from "../Containers/utils/redact";

const Paragraph = ({ news, guesses, win, difficulty }) => {
  return (
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
      <Heading
        color="redanews-grey"
        lineHeight="1.5"
        opacity="0.8"
        px="5"
        pt="2"
        align="left"
      >
        {win
          ? news.title.replace(/(?:\r\n|\r|\n)/g, "\n\n")
          : redact(news.title, guesses, difficulty)}
      </Heading>
      <Text
        color="redanews-grey"
        opacity="0.8"
        fontSize="lg"
        px="5"
        align="left"
        as="samp"
        whiteSpace="pre-line"
      >
        {win
          ? news.content.replace(/(?:\r\n|\r|\n)/g, "\n\n")
          : redact(news.content, guesses, difficulty)}
      </Text>
    </Stack>
  );
};

export default Paragraph;
