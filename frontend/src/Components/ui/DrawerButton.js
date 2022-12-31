// UI Components
import { Center } from "@chakra-ui/layout";

const DrawerButton = ({ onClickFn, text }) => {
  return (
    <Center
      h="10vh"
      w="100%"
      as="button"
      id={"drawer_button_" + text}
      color="redanews-blue"
      fontWeight="600"
      onClick={onClickFn}
      _focus={{
        bgColor: "redanews-blue",
        color: "white",
      }}
      _hover={{
        bgColor: "redanews-teal",
        color: "white",
      }}
    >
      {text}
    </Center>
  );
};

export default DrawerButton;
