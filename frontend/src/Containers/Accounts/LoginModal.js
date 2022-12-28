import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  Center,
  Stack,
  HStack,
  FormControl,
  Button,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { HiEye, HiEyeOff } from "react-icons/hi";

const LoginModal = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [inputError, setInputError] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleUsernameChange = (e) => {
    if (e.target.value !== "") {
      setInputError(false);
    }
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    if (e.target.value !== "") {
      setInputError(false);
    }
    setPassword(e.target.value);
  };

  const handleSubmit = () => {};

  const onClickReveal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Card width="35vw" minW="400px" backgroundColor="white" borderRadius="10px">
      <CardHeader>
        <Center>
          <HStack align="center" color="redanews" pt="1vmin">
            <Heading color="primary.500" fontSize="5vmin">
              Login to
            </Heading>
            <Heading fontFamily="Zen Dots" fontSize="5vmin">
              Redanews
            </Heading>
          </HStack>
        </Center>
      </CardHeader>
      <CardBody>
        <form onSubmit={(e) => handleSubmit(e)}>
          <Stack spacing={4}>
            <Stack spacing={4}>
              <Stack>
                <Text fontWeight="700" color="primary.500">
                  Username
                </Text>
                <FormControl id="username">
                  <Input
                    type="text"
                    id="login-username"
                    label="Username"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => handleUsernameChange(e)}
                    borderColor="primary.200"
                    focusBorderColor="redanews-blue"
                    _hover={{ borderColor: "redanews-teal" }}
                    borderWidth="2px"
                    borderRadius="10px"
                    isInvalid={inputError}
                    size="lg"
                    required
                  />
                </FormControl>
              </Stack>
              <Stack>
                <HStack justify="space-between">
                  <Text fontWeight="700" color="primary.500">
                    Password
                  </Text>
                  <Link
                    fontSize="sm"
                    color="redanews-grey"
                    fontWeight={800}
                    to="/"
                  >
                    Forgot your password?
                  </Link>
                </HStack>

                <FormControl id="password">
                  <InputGroup>
                    <Input
                      id="login-password"
                      type={isOpen ? "text" : "password"}
                      label="Password"
                      value={password}
                      onChange={(e) => handlePasswordChange(e)}
                      borderColor="primary.200"
                      focusBorderColor="redanews-blue"
                      _hover={{ borderColor: "redanews-teal" }}
                      borderWidth="2px"
                      borderRadius="10px"
                      isInvalid={inputError}
                      size="lg"
                      required
                    />
                    <InputRightElement>
                      <IconButton
                        onClick={onClickReveal}
                        icon={isOpen ? <HiEye /> : <HiEyeOff />}
                        aria-label={
                          isOpen ? "Mask password" : "Reveal password"
                        }
                        variant="link"
                        border="none"
                        marginTop="8px"
                        _focus={{
                          bg: "gray.100",
                          border: "none",
                          borderRadius: "full",
                        }}
                        marginRight="10px"
                        paddingY="5px"
                        fontSize="24px"
                        isRound
                      />
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
              </Stack>
            </Stack>
            <Stack spacing={4} pt="2vmin">
              <Button
                backgroundColor="white"
                border="2px"
                borderColor="redanews-teal"
                _hover={{
                  backgroundColor: "redanews-teal",
                  border: "0",
                  color: "white",
                }}
                size="lg"
                type="submit"
              >
                Sign in
              </Button>
              <Center>
                <Link
                  color="gray.400"
                  onClick={() => {
                    navigate("/signup");
                  }}
                >
                  Don't have an account?{" "}
                </Link>
              </Center>
            </Stack>
          </Stack>
        </form>
      </CardBody>
    </Card>
  );
};

export default LoginModal;
