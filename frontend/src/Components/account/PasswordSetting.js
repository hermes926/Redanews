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
  InputGroup,
  InputRightElement,
  Icon,
  IconButton,
  useToast,
} from "@chakra-ui/react";
import { FiLock, FiCheck } from "react-icons/fi";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { useEffect } from "react";

const PasswordSetting = () => {
  const [orgPassword, setOrgPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isOpen, setIsOpen] = useState({
    orgPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const displayToast = useToast();

  const onSubmit = () => {
    if (newPassword.length < 8) {
      displayToast({
        title: "Fail to Change Password",
        description: "Password is required to have at least 8 characters",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    } else if (newPassword !== confirmPassword) {
      displayToast({
        title: "Fail to Change Password",
        description: "New password not match with confirm password",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const onCancel = () => {
    displayToast({
      title: "Cancel Passwords Changing",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
    setOrgPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const onClickReveal = (type) => {
    setIsOpen({ ...isOpen, [type]: !isOpen[type] });
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
                        <Icon as={FiLock} strokeWidth="3px" w={5} h={5} />
                        <Text fontWeight="bold" fontSize="lg">
                          Original Password
                        </Text>
                      </Box>
                    </FormLabel>
                    <InputGroup>
                      <Input
                        type={isOpen.orgPassword ? "text" : "password"}
                        id="org-password"
                        label="org-password"
                        placeholder="Original Password"
                        value={orgPassword}
                        onChange={(e) => setOrgPassword(e.target.value)}
                        size="md"
                        color="redanews"
                        borderColor="black"
                        focusBorderColor="primary.400"
                        borderWidth="2px"
                        borderRadius="5px"
                        _hover={{ borderColor: "primary.400" }}
                      />
                      <InputRightElement>
                        <IconButton
                          onClick={() => onClickReveal("orgPassword")}
                          icon={isOpen.orgPassword ? <HiEye /> : <HiEyeOff />}
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
                        <Icon as={FiLock} strokeWidth="3px" w={5} h={5} />
                        <Text fontWeight="bold" fontSize="lg">
                          New Password
                        </Text>
                      </Box>
                    </FormLabel>
                    <InputGroup>
                      <Input
                        type={isOpen.newPassword ? "text" : "password"}
                        id="new-password"
                        label="new-password"
                        placeholder="New Password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        size="md"
                        color="redanews"
                        borderColor="black"
                        focusBorderColor="primary.400"
                        borderWidth="2px"
                        borderRadius="5px"
                        _hover={{ borderColor: "primary.400" }}
                      />
                      <InputRightElement>
                        <IconButton
                          onClick={() => onClickReveal("newPassword")}
                          icon={isOpen.newPassword ? <HiEye /> : <HiEyeOff />}
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
                        <Icon as={FiCheck} strokeWidth="3px" w={5} h={5} />
                        <Text fontWeight="bold" fontSize="lg">
                          Confirm Password
                        </Text>
                      </Box>
                    </FormLabel>
                    <InputGroup>
                      <Input
                        type={isOpen.confirmPassword ? "text" : "password"}
                        id="confirm-password"
                        label="confirm-password"
                        placeholder="Confirm New Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        size="md"
                        color="redanews"
                        borderColor="black"
                        focusBorderColor="primary.400"
                        borderWidth="2px"
                        borderRadius="5px"
                        _hover={{ borderColor: "primary.400" }}
                      />
                      <InputRightElement>
                        <IconButton
                          onClick={() => onClickReveal("confirmPassword")}
                          icon={
                            isOpen.confirmPassword ? <HiEye /> : <HiEyeOff />
                          }
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

export default PasswordSetting;
