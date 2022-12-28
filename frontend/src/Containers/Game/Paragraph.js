import React, { useState, useEffect } from "react";
import { Box, Stack, Heading, Text } from "@chakra-ui/react";

const Paragraph = () => {
  const news = {
    title:
      "This is a Test Title This is a Test Content. This is a Test Content. ",
    content:
      "This is a Test Content. This is a Test Content. This is a Test Content. This is a Test Content. This is a Test Content. This is a Test Content. This is a Test Content. This is a Test Content. This is a Test Content. This is a Test Content. This is a Test Content. This is a Test Content. This is a Test Content. This is a Test Content. This is a Test Content. This is a Test Content. This is a Test Content. This is a Test Content. This is a Test Content. This is a Test Content. This is a Test Content. This is a Test Content. This is a Test Content. This is a Test Content. This is a Test Content. This is a Test Content. This is a Test Content. This is a Test Content. This is a Test Content. This is a Test Content. This is a Test Content. This is a Test Content. This is a Test Content. This is a Test Content. This is a Test Content. This is a Test Content. This is a Test Content. This is a Test Content. This is a Test Content. This is a Test Content. This is a Test Content. This is a Test Content. This is a Test Content. This is a Test Content. This is a Test Content. This is a Test Content. This is a Test Content. This is a Test Content. This is a Test Content. This is a Test Content. This is a Test Content. This is a Test Content. This is a Test Content. This is a Test Content. This is a Test Content. This is a Test Content. This is a Test Content. This is a Test Content. This is a Test Content. This is a Test Content. This is a Test Content. This is a Test Content. This is a Test Content. This is a Test Content. This is a Test Content. ",
  };
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
      <Heading color="redanews-grey" opacity="0.8" px="5" pt="5" align="left">
        {news.title}
      </Heading>
      <Text
        color="redanews-grey"
        opacity="0.8"
        fontSize="md"
        px="5"
        align="left"
        as="samp"
      >
        {news.content}
      </Text>
    </Stack>
  );
};

export default Paragraph;
