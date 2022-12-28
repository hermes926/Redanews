import React, { useState, useEffect } from "react";
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
  useToast,
  useColorModeValue,
} from "@chakra-ui/react";
import { HiEye, HiEyeOff } from "react-icons/hi";
import axios from "../../api";

function checkPassword(password1, password2) {
  if (password1 === password2) {
    return "Same";
  }
  return "Passwords don't match";
}

const SignUpModal = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    username: false,
    email: false,
    passwordLength: false,
    confirmPassword: false,
  });

  const errorToast = useToast();

  const [hasRequest, setHasRequest] = useState(false);

  const [inputError, setInputError] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const labelName = ["username", "email", "password", "confirmPassword"];

  const onSubmit = async (e) => {
    e.preventDefault();
    const newInputs = labelName.reduce(
      (acc, item) => ({ ...acc, [item]: inputs[item].trim() }),
      {}
    );
    let hasError = labelName.reduce(
      (acc, item) => acc || newInputs[item] === "",
      false
    );

    setErrors(
      labelName.reduce((acc, item) => {
        if (item !== "password" && item !== "confirmPassword") {
          return { ...acc, [item]: newInputs[item].trim() === "" };
        }
        return { ...acc, [item]: newInputs[item] === "" };
      }, {})
    );
    // Check password
    const statusP = checkPassword(
      newInputs.password,
      newInputs.confirmPassword
    );
    if (statusP === "Passwords don't match") {
      setErrors((input) => ({ ...input, confirmPassword: true }));
      hasError = true;
    }

    if (!hasError) {
        const res = await axios.post('/auth/signup', {
          username: inputs.username.trim(),
          email: inputs.email.trim(),
          password: inputs.password.trim(),
        }).catch(() => {
          errorToast({
            title: "Signup Failed",
            description: "Username exist.",
            status: "error",
            duration: 2000,
            isClosable: true,
          });
        });
        
        if (res !== undefined) {
          errorToast({
            title: "Signup Successful",
            status: "success",
            duration: 2000,
            isClosable: true,
          });
          navigate("/");
        }

      setHasRequest(true);
    } else {
      if (errors.passwordLength === true) {
        errorToast({
          title: "Register Fail",
          description: "Password is required to have at least 8 characters",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      } else if (errors.confirmPassword === true) {
        errorToast({
          title: "Register Fail",
          description: "Password Not Match",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputs((input) => ({ ...input, [name]: value }));
    if (value !== "") {
      setErrors((input) => ({ ...input, [name]: false }));
    }

    if (name === "confirmPassword" || name === "password") {
      if (
        checkPassword(inputs.password, value) === "Passwords don't match" &&
        checkPassword(inputs.confirmPassword, value) === "Passwords don't match"
      ) {
        setErrors((input) => ({ ...input, confirmPassword: true }));
      } else {
        setErrors((input) => ({ ...input, confirmPassword: false }));
      }
    }

    if (name === "password") {
      if (value.length < 8) {
        setErrors((input) => ({ ...input, passwordLength: true }));
      } else {
        setErrors((input) => ({ ...input, passwordLength: false }));
      }
    }

    if (name === "username") {
      setErrors((input) => ({ ...input, username: false }));
    }

    if (name === "email") {
      setErrors((input) => ({ ...input, email: false }));
    }

    setHasRequest(false);
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
              Sign Up on
            </Heading>
            <Heading fontFamily="Zen Dots" fontSize="5vmin">
              Redanews
            </Heading>
          </HStack>
        </Center>
      </CardHeader>
      <CardBody>
        <form>
          <Stack spacing={4}>
            <Stack spacing={2}>
              <Stack>
                <Text fontSize="2vmin" fontWeight="700" color="primary.500">
                  Username
                </Text>
                <FormControl id="username">
                  <Input
                    type="text"
                    id="signup-username"
                    label="Username"
                    placeholder="Username"
                    name="username"
                    value={inputs.username}
                    onChange={(e) => handleChange(e)}
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
                <Text fontSize="2vmin" fontWeight="700" color="primary.500">
                  E-mail Address
                </Text>
                <FormControl id="email">
                  <Input
                    type="text"
                    id="signup-email"
                    label="Email Address"
                    placeholder="Email Address"
                    name="email"
                    value={inputs.email}
                    onChange={(e) => handleChange(e)}
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
                <Text fontSize="2vmin" fontWeight="700" color="primary.500">
                  Password
                </Text>
                <FormControl id="password">
                  <InputGroup>
                    <Input
                      id="signup-password"
                      type={isOpen ? "text" : "password"}
                      label="Password"
                      placeholder="Password"
                      name="password"
                      value={inputs.password}
                      onChange={(e) => handleChange(e)}
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

              <Stack>
                <Text fontSize="2vmin" fontWeight="700" color="primary.500">
                  Confirm Password
                </Text>
                <FormControl id="confirm-password">
                  <InputGroup>
                    <Input
                      id="signup-confirm-password"
                      type={isOpen ? "text" : "password"}
                      label="Confirm Password"
                      placeholder="Confirm Password"
                      name="confirmPassword"
                      value={inputs.confirmPassword}
                      onChange={(e) => handleChange(e)}
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
                onClick={(e) => onSubmit(e)}
              >
                Sign up
              </Button>
              <Center>
                <Link
                  color="gray.400"
                  onClick={() => {
                    navigate("/login");
                  }}
                  fontSize="2vmin"
                >
                  Already have an account?{" "}
                </Link>
              </Center>
            </Stack>
          </Stack>
        </form>
      </CardBody>
    </Card>
  );
};

export default SignUpModal;
