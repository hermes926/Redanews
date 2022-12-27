import { Card, CardBody, Heading, Text } from "@chakra-ui/react";

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
        style={{ border: "1px solid primary", borderRadius: "15px" }}
        _hover={{ boxShadow: "0px 2px 2px #18191F" }}
      >
        <CardBody>
          <Heading size="m" noOfLines={1}>
            {props.title}
          </Heading>
          <Text noOfLines={3}>{props.summary}</Text>
        </CardBody>
      </Card>
    </a>
  );
}

export default NewsCard;
