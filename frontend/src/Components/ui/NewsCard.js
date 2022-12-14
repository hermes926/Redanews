// React Utils, UI Components
import { Card, CardBody, Heading, Text } from "@chakra-ui/react";

// NewsCard designed for Homepage daily news display
function NewsCard(props) {
  return (
    <a target="_blank" href={props.link}>
      <Card
        width="90%"
        height="30%"
        backgroundColor="white"
        overflow="hidden"
        variant="outline"
        mb="2"
        textAlign="left"
        style={{ border: "1px solid redanews", borderRadius: "15px" }}
        _hover={{ boxShadow: "0px 2px 2px #18191F" }}
      >
        <CardBody>
          <Heading size="m" noOfLines={2}>
            {props.title}
          </Heading>
          <Text noOfLines={2} >{props.summary}</Text>
        </CardBody>
      </Card>
    </a>
  );
}

export default NewsCard;
