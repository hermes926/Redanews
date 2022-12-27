import { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Stack,
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

import Logo from "../../Components/ui/Logo";

const LoginModal = () => {
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
    <Card width="40vw" backgroundColor="white" borderRadius="10px">
      <CardHeader>
        <Heading align="center">Login</Heading>
      </CardHeader>
      <CardBody>
        <form onSubmit={(e) => handleSubmit(e)}>
          <Stack spacing={4}>
            <Stack spacing={4}>
              <FormControl id="username">
                <Input
                  type="text"
                  id="login-username"
                  _hover={{ borderColor: "primary.400" }}
                  label="Username"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => handleUsernameChange(e)}
                  focusBorderColor="primary.400"
                  borderWidth="2px"
                  borderRadius="pendown"
                  isInvalid={inputError}
                  size="lg"
                  borderColor="black"
                  required
                />
              </FormControl>
              <FormControl id="password">
                <InputGroup>
                  <Input
                    id="login-password"
                    type={isOpen ? "text" : "password"}
                    _hover={{ borderColor: "primary.400" }}
                    label="Password"
                    value={password}
                    onChange={(e) => handlePasswordChange(e)}
                    focusBorderColor="primary.400"
                    borderRadius="pendown"
                    borderColor="black"
                    borderWidth="2px"
                    placeholder="Password"
                    isInvalid={inputError}
                    size="lg"
                    required
                  />
                  <InputRightElement>
                    <IconButton
                      onClick={onClickReveal}
                      icon={isOpen ? <HiEye /> : <HiEyeOff />}
                      aria-label={isOpen ? "Mask password" : "Reveal password"}
                      variant="link"
                      border="none"
                      // size="lg"
                      // marginY="auto"
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
            <Stack spacing={8}>
              <Button variant="pendown-primary" size="lg" type="submit">
                Sign in
              </Button>

              <Link fontSize="sm" fontWeight={800} to="/">
                Forgot your password?
              </Link>
            </Stack>
          </Stack>
        </form>
      </CardBody>
    </Card>
  );
};

export default LoginModal;
