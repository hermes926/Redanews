import { commonWords, marks } from "./variables";

// Function for redacting given content with guesses and commonWords revealed
// Return the redacted content
function redact(content, guesses) {
  let redacted = "";
  const words = content.split(" ");
  for (let i = 0; i < words.length; i++) {
    let word = "";
    let mark = "";
    if (!marks.find((m) => m === words[i][words[i].length - 1])) {
      word = words[i];
    } else {
      word = words[i].substring(0, words[i].length - 1);
      mark = words[i][words[i].length - 1];
    }
    if (
      guesses.find(
        (guess) => guess.vocab.toLowerCase() === word.toLowerCase()
      ) ||
      commonWords.find((commonWord) => commonWord === word.toLowerCase())
    ) {
      redacted += " " + word;
    } else {
      redacted += " " + "█".repeat(word.length);
    }
    redacted += mark;
  }

  return redacted.substring(1);
}

export default redact;
