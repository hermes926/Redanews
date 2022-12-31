// React Utils, UI Components
import { Radio, RadioGroup, Stack, Box, Center } from "@chakra-ui/react";

// Difficulty Control Panel
const Difficulty = ({ difficulty, setDifficulty }) => {
  return (
    <Center h="10vh">
      <RadioGroup onChange={setDifficulty} value={difficulty}>
        <Stack direction="row">
          <Radio value="Easy">Easy</Radio>
          <Radio value="Medium">Medium</Radio>
          <Radio value="Hard">Hard</Radio>
        </Stack>
      </RadioGroup>
    </Center>
  );
};

export default Difficulty;
