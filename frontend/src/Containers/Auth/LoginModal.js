// React Utils, UI Components
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
  useToast,
} from "@chakra-ui/react";
import { HiEye, HiEyeOff } from "react-icons/hi";

// Functions, Utils
import axios from "../../api";

// Redanews Context Provider
import { useRedanews } from "../../Hooks/useRedanews";

const LoginModal = () => {
  const navigate = useNavigate();

  const { userId, setUserId, guessId, setGuessId, loginUser } = useRedanews();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [inputError, setInputError] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const displayToast = useToast();

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios
      .post("/auth/login", { username, password })
      .catch(() => {
        displayToast({
          title: "Login Failed",
          description: "Username or password incorrect.",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      });

    if (res !== undefined) {
      loginUser({
        username,
        email: "test@example.com",
        userId: res.data.account_id,
        guessId: res.data.guess_id,
      });
      displayToast({
        title: "Login Successful",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      navigate("/game");
    }
  };

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
            <Stack spacing={2}>
              <Stack>
                <Text fontSize="2vmin" fontWeight="700" color="primary.500">
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
                    size="md"
                    required
                  />
                </FormControl>
              </Stack>
              <Stack>
                <HStack justify="space-between">
                  <Text fontSize="2vmin" fontWeight="700" color="primary.500">
                    Password
                  </Text>
                  <Link
                    color="redanews-teal"
                    fontSize="2vmin"
                    fontWeight={600}
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
                      placeholder="Password"
                      value={password}
                      onChange={(e) => handlePasswordChange(e)}
                      borderColor="primary.200"
                      focusBorderColor="redanews-blue"
                      _hover={{ borderColor: "redanews-teal" }}
                      borderWidth="2px"
                      borderRadius="10px"
                      isInvalid={inputError}
                      size="md"
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
                        _focus={{
                          bg: "gray.100",
                          border: "none",
                          borderRadius: "full",
                        }}
                        marginRight="10px"
                        paddingY="2px"
                        fontSize="md"
                        isRound
                      />
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
              </Stack>
            </Stack>
            <Stack spacing={2} pt="2vmin">
              <Button
                backgroundColor="white"
                border="2px"
                borderColor="redanews-teal"
                _hover={{
                  backgroundColor: "redanews-teal",
                  border: "0",
                  color: "white",
                }}
                size="md"
                type="submit"
                onClick={(e) => {
                  handleSubmit(e);
                }}
              >
                Sign in
              </Button>
              <Center>
                <Link
                  color="gray.400"
                  onClick={() => {
                    navigate("/signup");
                  }}
                  fontSize="2vmin"
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
