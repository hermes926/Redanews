import React, { useState, useEffect } from "react";
import { Box, Stack, Heading, Text } from "@chakra-ui/react";
import redact from "../utils/redact";

const Paragraph = () => {
  const news = {
    title:
      "Zero-Covid was supposed to prove China’s supremacy. How did it all go so wrong for Xi Jinping?",
    content:
      "2022 was supposed to be a triumphant year for China and its leader Xi Jinping, as he began his second decade in power with a pledge to restore the nation to greatness. Instead, China had its most difficult year under Xi’s rule as it reeled from his costly zero-Covid policy – from months of overzealous enforcement that crushed the economy and stoked historic public discontent, to a wholesale abandonment so abrupt that left a fragile health system scrambling to cope with an explosion of cases. The chaos and disarray is a stark contrast to the start of the year, when Beijing showcased the success of its Covid containment measures by keeping the coronavirus largely at bay from the Winter Olympics.",
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
      <Heading
        color="redanews-grey"
        lineHeight="1.5"
        opacity="0.8"
        px="5"
        pt="2"
        align="left"
      >
        {redact(news.title, [])}
      </Heading>
      <Text
        color="redanews-grey"
        opacity="0.8"
        fontSize="lg"
        px="5"
        align="left"
        as="samp"
      >
        {redact(news.content, [])}
      </Text>
    </Stack>
  );
};

export default Paragraph;
