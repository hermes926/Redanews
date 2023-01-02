import { commonWords, regex } from "./variables";

const viewHistoryRecord = (guesses, content) => {
  let redacted = []; //this is new redact algorithm
  const words = content.split(regex);

  let words_index = words[0] === "" ? 1 : 0;
  for (let i = 0; i < content.length; i++) {
    if (regex.test(content[i])) {
      redacted.push(content[i]);
    } else {
      if (
        guesses.find(
          (guess) =>
            guess.vocab.toLowerCase() === words[words_index].toLowerCase()
        )
      ) {
        redacted.push(
          <span
            key={i * 2}
            className={words[words_index].toLowerCase()}
            style={{ fontWeight: "bold", color: "#39f3f2" }}
          >
            {words[words_index]}
          </span>
        ); //for guessed words, text are thicker.
      } else if (
        commonWords.find(
          (commonWord) => commonWord === words[words_index].toLowerCase()
        )
      ) {
        redacted.push(
          <span key={i * 2} className={words[words_index].toLowerCase()}>
            {words[words_index]}
          </span>
        ); //for given words, text are normal.
      } else {
        redacted.push(
          <span
            key={i * 2}
            className={words[words_index].toLowerCase()}
            style={{ color: "redanews-grey" }}
          >
            {words[words_index]}
          </span>
        ); //for words not being guessed, text are red.
      }
      i += words[words_index].length - 1;
      words_index += 1;
    }
  }
  return redacted;
};

export default viewHistoryRecord;
