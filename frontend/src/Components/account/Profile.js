// React Utils, UI Components
import { useState } from "react";
import { Box, Stack, HStack, Heading, Text, Avatar } from "@chakra-ui/react";

// User-defined Components, Container
import { avatarSrc } from "../../Utils/Image";

const Profile = ({ user }) => {
  return (
    <Box width="100%" height="100%" color="white">
      <HStack w="100%" h="100%">
        <Stack w="60%" h="100%">
          <Box h="10%"></Box>
          <HStack w="60%" spacing="10">
            <Avatar size="2xl" src={avatarSrc(user.username)} />
            <Box>
              <Heading color="primary.700">{user.username}</Heading>
              <Text color="redanews">{user.email}</Text>
            </Box>
          </HStack>
          <Box h="50%" />
        </Stack>
        <Box w="40%" h="100%"></Box>
      </HStack>
    </Box>
  );
};

export default Profile;
