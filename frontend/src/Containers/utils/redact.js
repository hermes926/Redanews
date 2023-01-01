import { commonWords, marks } from "./variables";

// Function for redacting given content with guesses and commonWords revealed
// Return the redacted content
function redact(content, guesses, difficulty) {
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
      } else if (difficulty === "Hard" || words[words_index].length < 3) {
        redacted += "█".repeat(words[words_index].length);
      } else if (difficulty === "Medium") {
        redacted +=
          words[words_index][0] +
          "█".repeat(words[words_index].length - 2) +
          words[words_index][words[words_index].length - 1];
      } else if (difficulty === "Easy") {
        redacted +=
          words[words_index][0] +
          "▉".repeat(words[words_index].length - 2) +
          words[words_index][words[words_index].length - 1];
      }
      i += words[words_index].length - 1;
      words_index += 1;
    }
  }

  return (
    <>
      {redacted
        .replace(/(?:\r\n|\r|\n)/g, "\n\n")
        .split(" ")
        .map((str, i) => {
          if (!marks.find((m) => m === str[str.length - 1])) {
            return (
              <span key={str + "-" + i}>
                <span className={str.toLowerCase()}>{str}</span>{" "}
              </span>
            );
          } else {
            return (
              <span key={str + "-" + i}>
                <span
                  className={str.substring(0, str.length - 1).toLowerCase()}
                >
                  {str.substring(0, str.length - 1)}
                </span>
                <span>{str[str.length - 1]}</span>{" "}
              </span>
            );
          }
        })}
    </>
  );
}

export default redact;
