import { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Stack,
  HStack,
  Box,
  UnorderedList,
  ListItem,
  Button,
  Text,
  Heading,
  Link,
} from "@chakra-ui/react";

// Ref:
// * Modal: https://chakra-ui.com/docs/components/modal/usage
// * Content: https://www.redactle.com/#

const Info = ({ infoOpen, InfoClick }) => {
  return (
    <Modal id="info-modal" isOpen={infoOpen} onClose={InfoClick}>
      <ModalOverlay />
      <ModalContent maxH="80vh" my="10vh">
        <ModalHeader>
          <HStack color="redanews" pt="5px">
            <Heading size="lg">Welcome to </Heading>
            <Heading size="lg" fontFamily="Zen Dots">
              RedaNews
            </Heading>
          </HStack>
        </ModalHeader>
        <ModalBody
          maxH="80%"
          overflowY="auto"
          sx={{
            "&::-webkit-scrollbar": {
              display: "none",
            },
          }}
        >
          <Stack spacing="5">
            <Stack spacing="2.5">
              <Text>
                RedaNews is a daily browser game where the user tries to
                determine the subject of a random obfuscated News article,
                chosen from{" "}
                <Link to="https://www.theguardian.com/international">
                  The Guardian
                </Link>
                .
              </Text>
              <Text>
                A new puzzle will be available every day at 00:00 UTC+08:00.
              </Text>
            </Stack>
            <Stack spacing="2.5">
              <HStack justify="space-between">
                <Heading size="md">How To Play</Heading>
                <Link px="2" to="./Tutorial">
                  Tutorial
                </Link>
              </HStack>
              <Box px="2">
                <UnorderedList>
                  <ListItem>
                    Type a word into the input box and press Enter or the "+"
                    icon.
                  </ListItem>
                  <ListItem>
                    All occurrences of that word will become unredacted in the
                    article body.
                  </ListItem>
                  <ListItem>
                    To win, figure out the title or subject of the article.
                  </ListItem>
                </UnorderedList>
              </Box>
            </Stack>
          </Stack>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="facebook" mr={3} onClick={InfoClick}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default Info;
