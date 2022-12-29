// React Utils, UI Components
import { Flex, Box, Heading } from "@chakra-ui/react";

// User-defined Components, Container
import HistoryTable from "../../Components/ui/HistoryTable";

import { history } from "../utils/variables";

const History = () => {
  const username = "Test User";
  return (
    <Flex height="90vh" direction="column" align="center" justify="center">
      <Box
        width="100%"
        height="90vh"
        bgColor="primary.300"
        opacity="0.2"
        position="absolute"
      />
      <Heading py="3vh" align="left">
        {username + "'s Guessing History"}
      </Heading>
      <HistoryTable history={history} />
    </Flex>
  );
};

export default History;
