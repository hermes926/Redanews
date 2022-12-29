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
} from '@chakra-ui/react'

import {useState} from 'react'

const Info=({infoOpen, InfoClick})=>{
	

	return(
		<Modal isOpen={infoOpen} onClose={InfoClick}>
        	<ModalOverlay />
        	<ModalContent>
          		<ModalHeader>Welcome to RedaNews</ModalHeader>
          		<ModalCloseButton />
          		<ModalBody>
            		<Text>This is Info</Text>
          		</ModalBody>

          		<ModalFooter>
            		<Button colorScheme='blue' mr={3} onClick={InfoClick}>
              			Close
            		</Button>
          		</ModalFooter>
        	</ModalContent>
      	</Modal>
	) 
}

export default Info