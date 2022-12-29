import { commonWords, marks } from "./variables";

// Function for redacting given content with guesses and commonWords revealed
// Return the redacted content
function redact(content, guesses) {
  let redacted = "";
  let cnt = 0;
  const words = content.split(/[\n\s]+/);
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
      redacted += (cnt > 0 ? content[cnt - 1]: " ") + word;
    } else {
      redacted += (cnt > 0 ? content[cnt - 1]: " ") + "█".repeat(word.length);
    }
    redacted += mark;
    cnt += (words[i].length + 1);
  }

  return redacted.substring(1).replace(/(?:\r\n|\r|\n)/g, '\n\n');
}

export default redact;
