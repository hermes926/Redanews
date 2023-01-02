import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
  Heading,
  Link,
  Tag,
  HStack,
} from "@chakra-ui/react";

import { useState, useEffect } from "react";
import { commonWords, marks } from "../../Containers/utils/variables";
import axios from "../../api";

const Record = ({ history, recordOpen, recordOpenClick }) => {
  //const content = "'happy birthday' to you happy birthday, to you happy birthday to you!"
  //const guesses = ["happy", "birthday"]
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [article, setArticle] = useState("");

  const makeRecord = (contentt) => {
    //copy from redact.js
    const guesses = history.vocabs;

    let redacted = []; //this is new redact algorithm
    const words = contentt.split(
      /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~\n\s’‘–]+/
    );
    let words_index = words[0] === "" ? 1 : 0;
    for (let i = 0; i < contentt.length; i++) {
      if (/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~\n\s’‘–]/.test(contentt[i])) {
        redacted.push(contentt[i]);
      } else {
        if (
          guesses.find(
            (guess) => guess.toLowerCase() === words[words_index].toLowerCase()
          )
        ) {
          redacted.push(
            <span key={i * 2} style={{ fontWeight: "bolder" }}>
              {words[words_index]}
            </span>
          ); //for guessed words, text are thicker.
        } else if (
          commonWords.find(
            (commonWord) => commonWord === words[words_index].toLowerCase()
          )
        ) {
          redacted.push(<span key={i * 2}>{words[words_index]}</span>); //for given words, text are normal.
        } else {
          redacted.push(
            <span key={i * 2} style={{ color: "#FFC9C9" }}>
              {words[words_index]}
            </span>
          ); //for words not being guessed, text are red.
        }
        i += words[words_index].length - 1;
        words_index += 1;
      }
    }
    return redacted;
  };

  useEffect(() => {
    if (content != "") {
      setArticle(makeRecord(content));
      setTitle(makeRecord(history.newsTitle));
    }
  }, [content]);

  useEffect(() => {
    if (recordOpen) {
      getArtitle();
    }
  }, [recordOpen]);

  return (
    <Modal
      isOpen={recordOpen}
      onClose={() => {
        recordOpenClick();
      }}
      size="4xl"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Heading size="lg">Record on {history.newsDate}</Heading>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <HStack justify="space-between">
            <HStack spacing="2">
              <Text fontWeight="700">News Title : </Text>
              <Link as="button" color="teal" href={history.newsLink} isExternal>
                {history.newsTitle}
              </Link>
            </HStack>
            {history.win ? (
              <Tag size="md" colorScheme="red">
                SUCCESS
              </Tag>
            ) : (
              <Tag size="md" colorScheme="red">
                FAILED
              </Tag>
            )}
          </HStack>
          <Text fontWeight="700">Your Guessing Progress : </Text>
          <Heading>{title}</Heading>
          {article}
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme="facebook"
            mr={3}
            onClick={() => {
              recordOpenClick();
            }}
          >
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default Record;
