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
  Heading,
} from '@chakra-ui/react'

import {useState, useEffect} from 'react'
import { commonWords, marks } from "../../Containers/utils/variables";
import axios from "../../api";

const Record=({history, recordOpen, recordOpenClick})=>{
  //const content = "'happy birthday' to you happy birthday, to you happy birthday to you!"
  //const guesses = ["happy", "birthday"]
  const [content, setContent] = useState("")
  const [title, setTitle] = useState("")
  const [article, setArticle] = useState("")
  
  const getArtitle = async()=>{ 
      const payload = await axios.get("/news/all/" + history.news_id)
      //console.log(payload)
      setContent(payload.data.article)
  }

  const makeRecord=(contentt)=>{   //copy from redact.js
    const guesses = history.vocabs
    /*let redacted = [];       //this is old redact algorithm
    let cnt = 0;
    const words = contentt.split(/[\n\s]+/);
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
        ) 
      ){
        redacted.push( <span key={i*2} style={{fontWeight: 'bolder'}}>{(cnt > 0 ? contentt[cnt - 1] : " ") + word}</span> )    //for guessed words, text are thicker.
      }
      else if (commonWords.find((commonWord) => commonWord === word.toLowerCase())
      ) {
        redacted.push( <span key={i*2}>{(cnt > 0 ? contentt[cnt - 1] : " ") + word}</span> )    //for given words, text are normal.
      } else{
        redacted.push(<span key={i*2} style={{color: '#FFC9C9'}}>{(cnt > 0 ? contentt[cnt - 1] : " ") + word}</span>)    //for words not being guessed, text are red.
      }

      redacted.push(<span key={i*2+1}>{mark}</span>);
      cnt += words[i].length + 1;
    }
    return redacted*/
    let redacted = [];                     //this is new redact algorithm
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
          (guess) =>
            guess.toLowerCase() === words[words_index].toLowerCase()
        )){
        redacted.push( <span key={i*2} style={{fontWeight: 'bolder'}}>{words[words_index]}</span> )    //for guessed words, text are thicker.
      } else if (
        commonWords.find(
          (commonWord) => commonWord === words[words_index].toLowerCase()
        )
      ) {
        redacted.push( <span key={i*2}>{words[words_index]}</span> )    //for given words, text are normal.
      } else {
        redacted.push(<span key={i*2} style={{color: '#FFC9C9'}}>{words[words_index]}</span>)    //for words not being guessed, text are red.
      } 
      i += words[words_index].length - 1;
      words_index += 1;
    }
  }
    return redacted
  }

  useEffect(()=>{
    if(content != ""){
      setArticle(makeRecord(content))
      setTitle(makeRecord(history.newsTitle))
    }
  }, [content])

  useEffect(()=>{
    if(recordOpen){
      getArtitle()
    }
  }, [recordOpen])
  

  return(
    <Modal isOpen={recordOpen} onClose={()=>{recordOpenClick()}} size='5xl'>
          <ModalOverlay />
          <ModalContent>
              <ModalHeader>Record on {history.newsDate}</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Text>News title : {history.newsTitle}</Text>
                <Text>Link : <Link color="teal" href={history.newsLink} isExternal>{history.newsLink}</Link></Text>
                <Text>Your answer : </Text>
                <Heading>{title}</Heading>
                {article}
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