import { commonWords, marks } from "./variables";

// Function for redacting given content with guesses and commonWords revealed
// Return the redacted content
function redact(content, guesses, difficulty) {
  let redacted = [];
  let cnt = 0;
  const words = content.split(
    /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~\n\s’‘–]+/
  );
  let words_index = 1;
  for (let i = 0; i < content.length; i++) {
    if (/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~\n\s’‘–]/.test(content[i])) {
      redacted.push(content[i]);
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
        redacted.push(words[words_index]);
      } else if (difficulty === "Hard" || words[words_index].length < 3) {
        redacted.push("█".repeat(words[words_index].length));
      } else if (difficulty === "Medium") {
        redacted.push(
          words[words_index][0] +
            "█".repeat(words[words_index].length - 2) +
            words[words_index][words[words_index].length - 1]
        );
      } else if (difficulty === "Easy") {
        redacted.push(
          words[words_index][0] +
            "▉".repeat(words[words_index].length - 2) +
            words[words_index][words[words_index].length - 1]
        );
      }
      i += words[words_index].length - 1;
      words_index += 1;
    }
  }

  return (
    <>
      {redacted.map((str, i) => (
        <span key={str + "-" + i}>
          <span className={str.toLowerCase()}>{str}</span>
          {!/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~\n\s’‘–]/.test(str) &&
          i !== redacted.length - 1 &&
          !/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~\n\s’‘–]/.test(
            redacted[i + 1]
          )
            ? " "
            : ""}
        </span>
      ))}
    </>
  );
}

export default redact;
