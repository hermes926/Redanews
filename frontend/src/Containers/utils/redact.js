const commonWords = [
  // Original redactle
  "a",
  "aboard",
  "about",
  "above",
  "across",
  "after",
  "against",
  "along",
  "amid",
  "among",
  "an",
  "and",
  "around",
  "as",
  "at",
  "because",
  "before",
  "behind",
  "below",
  "beneath",
  "beside",
  "between",
  "beyond",
  "but",
  "by",
  "concerning",
  "considering",
  "despite",
  "down",
  "during",
  "except",
  "following",
  "for",
  "from",
  "if",
  "in",
  "inside",
  "into",
  "is",
  "it",
  "like",
  "minus",
  "near",
  "next",
  "of",
  "off",
  "on",
  "onto",
  "opposite",
  "or",
  "out",
  "outside",
  "over",
  "past",
  "per",
  "plus",
  "regarding",
  "round",
  "save",
  "since",
  "than",
  "the",
  "through",
  "till",
  "to",
  "toward",
  "under",
  "underneath",
  "unlike",
  "until",
  "up",
  "upon",
  "versus",
  "via",
  "was",
  "with",
  "within",
  "without",

  // Redactle Extended
  "all",
  "any",
  "are",
  "be",
  "can",
  "first",
  "may",
  "many",
  "most",
  "much",
  "one",
  "some",
  "that",
  "were",
  "which",
];

const marks = [
  ".",
  ",",
  "-",
  "_",
  "-",
  "(",
  ")",
  "[",
  "]",
  "/",
  "\\",
  "!",
  "?",
  ":",
  ";",
];

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
      guesses.find((guess) => guess === word.toLowerCase()) ||
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
