import { news, commonWords, marks } from "./variables";

const countHits = (currentGuess) => {
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

const handleGuess = (currentGuess, setCurrentGuess, guesses, setGuesses) => {
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
        count: countHits(currentGuess),
      },
    ]);
    return true;
  }
};

export default handleGuess;
