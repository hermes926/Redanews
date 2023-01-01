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
    let redacted = [];
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
        redacted.push( <span key={i*2} style={{fontWeight: 'bold'}}>{(cnt > 0 ? contentt[cnt - 1] : " ") + word}</span> )
      }
      else if (commonWords.find((commonWord) => commonWord === word.toLowerCase())
      ) {
        redacted.push( <span key={i*2}>{(cnt > 0 ? contentt[cnt - 1] : " ") + word}</span> )
      } else{
        redacted.push(<span key={i*2} style={{color: '#FFC9C9'}}>{(cnt > 0 ? contentt[cnt - 1] : " ") + word}</span>)
      }

      redacted.push(<span key={i*2+1}>{mark}</span>);
      cnt += words[i].length + 1;
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
                <Text>News title: {history.newsTitle}</Text>
                <Text>Link: <Link color="teal" href={history.newsLink} isExternal>{history.newsLink}</Link></Text>
                <Text>Content: </Text>
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