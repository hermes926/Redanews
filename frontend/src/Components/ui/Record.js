import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Lorem,
  Text,
  Link,
} from '@chakra-ui/react'

import {useState} from 'react'
import { commonWords, marks } from "../../Containers/utils/variables";

const Record=({history, recordOpen, recordOpenClick})=>{
  const content = "'happy birthday' to you happy birthday, to you happy birthday to you!"
  const guesses = ["happy", "birthday"]

  const makeRecord=()=>{   //copy from redact.js
    let redacted = [];
    let cnt = 0;
    const words = content.split(/[\n\s]+/);
    for (let i = 0; i < words.length; i++) {
      let word = "";
      let mark = "";
      if (!marks.find((m) => m === words[i][words[i].length - 1])) {
        word = words[i];
      } else {
        word = words[i].substring(0, words[i].length - 1);
        mark = words[i][words[i].length - 1];
      }
      if (
        guesses.find(
          (guess) => guess.toLowerCase() === word.toLowerCase()
        ) ||
        commonWords.find((commonWord) => commonWord === word.toLowerCase())
      ) {
        redacted.push( <span key={i*2}>{(cnt > 0 ? content[cnt - 1] : " ") + word}</span> )
      } else{
        redacted.push(<span key={i*2} style={{color: 'red'}}>{(cnt > 0 ? content[cnt - 1] : " ") + word}</span>)
      }

      redacted.push(<span key={i*2+1}>{mark}</span>);
      cnt += words[i].length + 1;
    }
    return redacted
  }

  return(
    <Modal isOpen={recordOpen} onClose={()=>{recordOpenClick()}}>
          <ModalOverlay />
          <ModalContent>
              <ModalHeader>Record on {history.newsDate}</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Text>News title: {history.newsTitle}</Text>
                <Text>Link: <Link color="redanews-teal" href={history.newsLink}>{history.newsLink}</Link></Text>
                <Text>Content: </Text>
                {makeRecord()}
              </ModalBody>

              <ModalFooter>
                <Button colorScheme='blue' mr={3} onClick={()=>{recordOpenClick()}}>
                    Close
                </Button>
              </ModalFooter>
          </ModalContent>
        </Modal>
  ) 
}

export default Record