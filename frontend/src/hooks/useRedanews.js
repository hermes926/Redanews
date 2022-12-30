import { createContext, useContext, useState } from "react";

const RedanewsContext = createContext({
  login: Boolean,
  user: {},
  news: {},
  trendingNews: [],
  guessId: String,
  guesses: [],
  history: [],

  loginUser: () => {},
  logOutUser: () => {},

  updateNews: () => {},
  updateGuesses: () => {},
  updateGuessHistory: () => {},

  setGuesses: () => {},
});

const RedanewsProvider = (props) => {
  const [login, setLogin] = useState(false);

  const [user, setUser] = useState({
    username: "",
    email: "",
  });

  const [news, setNews] = useState({
    title: "",
    content: "",
  });

  const [trendingNews, setTrendingNews] = useState([
    {
      title: "Test News 1",
      summary:
        "This is test content. This is test content. This is test content. ",
      link: "https://edition.cnn.com/",
    },
    {
      title: "Test News 2",
      summary: "This is test content. ",
      link: "https://edition.cnn.com/",
    },
    {
      title: "Test News 3",
      summary: "This is test content. ",
      link: "https://edition.cnn.com/",
    },
    {
      title: "Test News 3",
      summary: "This is test content. ",
      link: "https://edition.cnn.com/",
    },
  ]);

  const [guessId, setGuessId] = useState("");
  const [guesses, setGuesses] = useState([]);

  const [history, setHistory] = useState([]);

  const loginUser = (user) => {
    setUser(user);
    setLogin(true);
  };

  const logOutUser = () => {
    setUser({});
    setLogin(false);
  };

  const updateNews = (newsToUpdate) => {
    setNews(newsToUpdate);
  };

  const updateGuesses = (newGuess) => {
    setGuesses([...guesses, newGuess]);
  };

  const updateGuessHistory = (newHistory) => {
    setHistory(newHistory);
  };

  return (
    <RedanewsContext.Provider
      value={{
        login,
        user,
        news,
        trendingNews,
        guessId,
        guesses,
        history,
        loginUser,
        logOutUser,
        updateNews,
        setTrendingNews,
        updateGuesses,
        setGuesses,
        updateGuessHistory,
      }}
      {...props}
    />
  );
};

function useRedanews() {
  return useContext(RedanewsContext);
}

export { RedanewsProvider, useRedanews };
