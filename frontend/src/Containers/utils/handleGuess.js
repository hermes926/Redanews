import { commonWords, marks } from "./variables";

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
const handleGuess = (currentGuess, setCurrentGuess, guesses, setGuesses, news) => {
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
    setCurrentGuess("");
    setGuesses([
      ...guesses,
      {
        vocab: currentGuess,
        count: countHits(currentGuess, news),
      },
    ]);
    return true;
  }
};

export default handleGuess;
