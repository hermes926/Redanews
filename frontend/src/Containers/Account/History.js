// React Utils, UI Components
import { Flex, Box, Heading, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "../../api";

// User-defined Components, Container
import HistoryTable from "../../Components/ui/HistoryTable";
import { getCookie } from "../../Utils/CookieUsage";

// Redanews Context Provider
import { useRedanews } from "../../Hooks/useRedanews";

const History = () => {
  const { history, updateGuessHistory, setUserId } = useRedanews();
  const [username, setUsername] = useState("");
  const userId = getCookie("userId");
  const displayToast = useToast();

  useEffect(() => {
    const getHistory = async () => {
      setUserId(userId);
      await axios
        .get("/user/" + userId + "/history")
        .catch((e) => {
          displayToast({
            title: "Fetch Histroy Failed",
            status: "error",
            duration: 2000,
            isClosable: true,
          });
        })
        .then((res) => {
          if (res.status === 200) {
            let newGuessHistory = [];
            for (let i = 0; i < res.data.guesses.length; i++) {
              const newGuess = {
                guess_id: res.data.guesses[i].guess_id,
                news_id: res.data.guesses[i].news_id,
                newsTitle: res.data.guesses[i].title,
                newsDate: res.data.guesses[i].date,
                newsLink: res.data.guesses[i].link,
                correctCnt: res.data.guesses[i].correctCnt,
                guessesCnt: res.data.guesses[i].guessCnt,
                avgGuess: res.data.guesses[i].avgGuess,
                win: res.data.guesses[i].win ? res.data.guesses[i].win : false,
              };
              newGuessHistory = [...newGuessHistory, newGuess];
            }
            updateGuessHistory(newGuessHistory);
            setUsername(res.data.username);
          }
        });
    };
    getHistory();
  }, []);

  if (!history || !username) {
    return <></>;
  } else {
    return (
      <Flex height="90vh" direction="column" align="center" justify="center">
        <Box
          width="100%"
          height="90vh"
          bgImage="https://cdn.pixabay.com/photo/2017/03/12/17/54/quiz-2137664_1280.jpg"
          opacity="0.2"
          position="absolute"
        />
        <Heading py="3vh" align="left">
          {username + "'s Guessing History"}
        </Heading>
        <HistoryTable history={history} />
      </Flex>
    );
  }
};

export default History;
