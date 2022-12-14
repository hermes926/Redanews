// React Utils, UI Components
import { useEffect, useState } from "react";
import {
  Flex,
  Box,
  Tab,
  Tabs,
  TabList,
  TabPanel,
  TabPanels,
} from "@chakra-ui/react";

// User-defined Components, Container
import Profile from "../../Components/account/Profile";
import Setting from "../../Components/account/Setting";
import PasswordSetting from "../../Components/account/PasswordSetting";

// Redanews Context Provider
import { useRedanews } from "../../Hooks/useRedanews";

const AccountInfo = () => {
  const { user, userId, updateUser } = useRedanews();

  const [pages, setPages] = useState([
    {
      label: "Profile",
      content: <Profile user={user} />,
    },
    {
      label: "Setting",
      content: <Setting user={user} userId={userId} updateUser={updateUser} />,
    },
    {
      label: "Change Password",
      content: <PasswordSetting userId={userId} />,
    },
  ]);

  return (
    <Flex height="90vh" align="center" justify="center">
      <Box width="100%" height="90vh" position="absolute" />
      <Tabs
        isLazy
        width="80vw"
        colorScheme="redanews-blue"
        position="relative"
        size="md"
      >
        <TabList borderBottomWidth="2px" borderBottomColor="black">
          {pages.map((tab, i) => (
            <Tab
              fontWeight="700"
              borderTopRadius="5px"
              _selected={{ color: "white", bg: "redanews-blue" }}
              key={tab.label}
            >
              {tab.label}
            </Tab>
          ))}
        </TabList>
        <TabPanels
          width="80vw"
          height="60vh"
          borderStyle="none"
          _before={{ borderStyle: "none" }}
          _after={{ borderStyle: "none" }}
        >
          {pages.map((tab) => (
            <TabPanel height="100%" p={0} pt={2} key={tab.label}>
              {tab.content}
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </Flex>
  );
};

export default AccountInfo;
