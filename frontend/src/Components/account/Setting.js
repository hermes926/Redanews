// React Utils, UI Components
// React Utils, UI Components
import { useState } from "react";
import {
  Flex,
  Box,
  Stack,
  Center,
  Text,
  Button,
  FormControl,
  FormLabel,
  Input,
  Icon,
  useToast,
} from "@chakra-ui/react";

import { FiUser, FiAtSign, FiMail, FiEdit2 } from "react-icons/fi";

const Setting = ({ user }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const displayToast = useToast();

  const onSubmit = () => {};

  const onCancel = () => {
    displayToast({
      title: "Cancel Settings Editing",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
    setUsername("");
    setEmail("");
  };

  return (
    <Box width="100%" height="100%" color="white">
      <Center width="100%">
        <Box w="100%" py={4} px={8}>
          <Flex direction="column" gap={10} pt={4}>
            <Box>
              <Stack display="flex" direction="column" gap={5}>
                <FormControl>
                  <Stack
                    display="flex"
                    alignItems={{ base: "start", md: "center" }}
                    justifyContent="space-between"
                    direction={{ base: "column", md: "row" }}
                  >
                    <FormLabel
                      display="block"
                      textAlign="start"
                      marginInlineEnd={3}
                      transitionProperty="all"
                      transitionDuration="150ms"
                      minWidth="3xs"
                      htmlFor="name"
                    >
                      <Box
                        color="redanews"
                        display="flex"
                        alignItems="center"
                        gap="2"
                      >
                        <Icon as={FiAtSign} strokeWidth="3px" w={5} h={5} />
                        <Text fontWeight="bold" fontSize="lg">
                          Username
                        </Text>
                      </Box>
                    </FormLabel>
                    <Input
                      type="text"
                      id="username"
                      label="username"
                      placeholder="Username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      size="md"
                      color="redanews"
                      borderColor="black"
                      focusBorderColor="primary.400"
                      borderWidth="2px"
                      borderRadius="5px"
                      _hover={{ borderColor: "primary.400" }}
                    />
                  </Stack>
                </FormControl>
                <FormControl>
                  <Stack
                    display="flex"
                    alignItems={{ base: "start", md: "center" }}
                    justifyContent="space-between"
                    direction={{ base: "column", md: "row" }}
                  >
                    <FormLabel
                      display="block"
                      textAlign="start"
                      marginInlineEnd={3}
                      transitionProperty="all"
                      transitionDuration="150ms"
                      minWidth="3xs"
                      htmlFor="name"
                    >
                      <Box
                        color="redanews"
                        display="flex"
                        alignItems="center"
                        gap="2"
                      >
                        <Icon as={FiMail} strokeWidth="3px" w={5} h={5} />
                        <Text fontWeight="bold" fontSize="lg">
                          Email
                        </Text>
                      </Box>
                    </FormLabel>
                    <Input
                      type="email"
                      id="email"
                      label="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      size="md"
                      color="redanews"
                      borderColor="black"
                      focusBorderColor="primary.400"
                      borderWidth="2px"
                      borderRadius="5px"
                      _hover={{ borderColor: "primary.400" }}
                    />
                  </Stack>
                </FormControl>
              </Stack>
            </Box>
            <Flex direction="row-reverse" gap={4}>
              <Button
                size="lg"
                bgColor="primary.600"
                _hover={{
                  backgroundColor: "redanews-teal",
                  border: "0",
                  color: "white",
                }}
                onClick={onSubmit}
              >
                Save
              </Button>
              <Button
                size="lg"
                bgColor="primary.300"
                _hover={{
                  backgroundColor: "primary.200",
                  border: "0",
                  color: "white",
                }}
                onClick={onCancel}
              >
                Cancel
              </Button>
            </Flex>
          </Flex>
        </Box>
      </Center>
    </Box>
  );
};

export default Setting;
