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
  Stack,
} from "@chakra-ui/react";

const Record = ({ history, recordOpen, recordOpenClick }) => {
  return (
    <Modal
      isOpen={recordOpen}
      onClose={() => {
        recordOpenClick();
      }}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Heading size="lg">Record on {history.newsDate}</Heading>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack spacing="5">
            <HStack>
              <Text fontWeight="700">Status :</Text>
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
            <Stack spacing="2">
              <Text fontWeight="700">News Title : </Text>
              <Link
                color="teal"
                _hover={{
                  color: "redanews-blue",
                  cursor: "pointer",
                  textDecoration: "underline",
                }}
                href={history.newsLink}
                align="left"
                isExternal
              >
                {history.newsTitle}
              </Link>
            </Stack>

            <HStack spacing="2">
              <Text fontWeight="700">Your Game : </Text>
              <Link
                color="teal"
                _hover={{
                  color: "redanews-blue",
                  cursor: "pointer",
                  textDecoration: "underline",
                }}
                href={"/archives/" + history.news_id + "/" + history.guess_id}
              >
                Click to view{" "}
              </Link>
            </HStack>
          </Stack>
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
