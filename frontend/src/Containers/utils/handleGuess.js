import { commonWords, marks } from "./variables";
import axios from "../../api";
import { getCookie } from "../../Utils/CookieUsage";

// Function for counting word hits with the today's quiz
const countHits = (currentGuess, news) => {
  const count = news.title
    .split(/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~\n\s’‘–]+/)
    .concat(
      news.content.split(/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~\n\s’‘–]+/)
    )
    .filter((word) => word.toLowerCase() === currentGuess.toLowerCase()).length;
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
  if (currentGuess.includes(" ")) {
    return {
      title: "Fail to guess",
      description: `Please guess a word without any space`,
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

// Check win or not
const checkWin = (guesses, content) => {
  let redacted = "";
  let cnt = 0;
  const words = content.split(
    /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~\n\s’‘–]+/
  );
  let words_index = 1;
  for (let i = 0; i < content.length; i++) {
    if (/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~\n\s’‘–]/.test(content[i])) {
      redacted += content[i];
    } else {
      if (
        guesses.find(
          (guess) =>
            guess.vocab.toLowerCase() === words[words_index].toLowerCase()
        ) ||
        commonWords.find(
          (commonWord) => commonWord === words[words_index].toLowerCase()
        )
      ) {
        redacted += words[words_index];
      } else {
        redacted += "█".repeat(words[words_index].length);
      }
      i += words[words_index].length - 1;
      words_index += 1;
    }
  }
  return !redacted.includes("█") && content !== "";
};

export { handleGuess, countHits, checkWin };
