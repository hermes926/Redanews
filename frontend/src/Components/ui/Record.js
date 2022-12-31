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

const Record=({history, recordOpen, recordOpenClick})=>{
  

  return(
    <Modal isOpen={recordOpen} onClose={()=>{recordOpenClick()}}>
          <ModalOverlay />
          <ModalContent>
              <ModalHeader>Record on {history.newsDate}</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Text>News title: {history.newsTitle}</Text>
                <Text>Link: <Link color="redanews-teal" href={history.newsLink}>{history.newsLink}</Link></Text>
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