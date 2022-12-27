import { Box, Center } from "@chakra-ui/react";

const Logo = (props) => {
  return (
    <Center
      fontSize="24px"
      fontFamily="Zen Dots"
      color={props.color ? props.color : "white"}
      padding="1px 0 0 0"
    >
      RedaNews
    </Center>
  );
};

export default Logo;
