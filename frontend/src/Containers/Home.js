import { useState } from "react";
import { Box, Container, HStack, Text, Button } from "@chakra-ui/react";
import { useNavigate, useLocation } from "react-router-dom";

import NewsCard from "../Components/ui/NewsCard";

const Home = () => {
  const navigate = useNavigate();
  const news = [
    {
      title: "Test News 1",
      summary:
        "This is test content. This is test content. This is test content. ",
      link: "https://edition.cnn.com/",
    },
    {
      title: "Test News 2",
      summary: "This is test content. ",
      link: "https://edition.cnn.com/",
    },
    {
      title: "Test News 3",
      summary: "This is test content. ",
      link: "https://edition.cnn.com/",
    },
    {
      title: "Test News 3",
      summary: "This is test content. ",
      link: "https://edition.cnn.com/",
    },
  ];
  return (
    <Box width="100%" height="100%" align="center" margin="0 0 0 0">
      <Box
        backgroundImage="https://cdn.pixabay.com/photo/2019/02/10/19/30/newspaper-3988054_1280.jpg"
        width="100%"
        height="90vh"
        opacity="0.1"
        position="absolute"
      />
      <Container maxW="90%" height="90vh" px="0">
        <HStack justify="space-between" height="100%">
          <Box
            width="45%"
            height="100%"
            display="flex"
            flexDirection="column-reverse"
            textAlign="left"
            px="0"
          >
            <Container height="15%" px="0"></Container>
            <Container
              height="30%"
              px="0"
              pt="10px"
              fontSize="3vmin"
              fontWeight="500"
            >
              <Text>
                RedaNews redacts a daily news every day, user will need to guess
                several vocabulary to fill the redacted blanks and find the news
                title to win!
              </Text>
              <br />
              <HStack fontSize="2.5vmin">
                <Button
                  colorScheme="facebook"
                  variant="solid"
                  width="fit-content"
                  fontSize="2.5vmin"
                  onClick={() => navigate("/login")}
                  style={{ "white-space": "normal" }}
                >
                  Login Now
                </Button>{" "}
                <Text
                  opacity="0.5"
                  onClick={() => navigate("/game")}
                  _hover={{ cursor: "pointer" }}
                >
                  Continue without login
                </Text>
              </HStack>
            </Container>
            <Container px="0" fontSize="6.5vmin" fontWeight="900">
              Playing RedaNews, Get Catch-Up With The Latest News
            </Container>
          </Box>
          <Box
            width="50%"
            height="90%"
            alignItems="center"
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
            {news.map((piece, i) => (
              <NewsCard
                title={piece.title}
                summary={piece.summary}
                link={piece.link}
              />
            ))}
          </Box>
        </HStack>
      </Container>
    </Box>
  );
};

export default Home;
