import { commonWords, marks } from "./variables";
import axios from "../../api";
import { getCookie } from "../../Utils/CookieUsage";

// Function for counting word hits with the today's quiz
const countHits = (currentGuess, news) => {
  let count = 0;
  const words = news.title.split(" ").concat(news.content.split(" "));
  for (let i = 0; i < words.length; i++) {
    let word = "";
    if (!marks.find((m) => m === words[i][words[i].length - 1])) {
      word = words[i];
    } else {
      word = words[i].substring(0, words[i].length - 1);
    }
    if (word.toLowerCase() === currentGuess.toLowerCase()) {
      count += 1;
    }
  }
  return count;
};

// Handling guess submission
// Return type: true for successfully make a guess; toast body for providing warning or error
const handleGuess = async (
  currentGuess,
  setCurrentGuess,
  guesses,
  setGuesses,
  news
) => {
  if (currentGuess === "") {
    return {
      title: "Fail to guess",
      description: `Please input a vocabulary to guess`,
      status: "warning",
      duration: 2000,
      isClosable: true,
    };
  }
  if (
    guesses.find(
      (guess) => guess.vocab.toLowerCase() === currentGuess.toLowerCase()
    )
  ) {
    setCurrentGuess("");
    Array.from(
      document.getElementsByClassName(
        "guess_history_" + currentGuess.toLowerCase()
      )
    )[0].click();
    Array.from(
      document.getElementsByClassName(
        "guess_history_" + currentGuess.toLowerCase()
      )
    )[0].scrollIntoView({ behavior: "smooth", block: "center" });
    return {
      title: "Fail to guess",
      description: `"${currentGuess}" has already been guessed`,
      status: "error",
      duration: 2000,
      isClosable: true,
    };
  } else if (
    commonWords.find((commonWord) => commonWord === currentGuess.toLowerCase())
  ) {
    setCurrentGuess("");
    return {
      title: "Fail to guess",
      description: `"${currentGuess}" is already revealed`,
      status: "warning",
      duration: 2000,
      isClosable: true,
    };
  } else {
    const guessId = getCookie("guessId");
    const cntHit = countHits(currentGuess, news);
    if (guessId) {
      await axios
        .patch("/guess/" + guessId, {
          vocabulary: currentGuess,
          correct: cntHit > 0,
        })
        .catch((e) => {
          console.log(e);
        });
    }
    setCurrentGuess("");
    setGuesses([
      ...guesses,
      {
        vocab: currentGuess,
        count: cntHit,
      },
    ]);
    return true;
  }
};

export { handleGuess, countHits };
