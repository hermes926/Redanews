import { createContext, useContext, useState } from "react";
import { setCookie, deleteCookie } from "../Utils/CookieUsage";

const RedanewsContext = createContext({
  load: Boolean,
  login: Boolean,
  user: {},
  userId: String,
  String,
  news: {},
  trendingNews: [],
  guessId: String,
  guesses: [],
  history: [],

  loginUser: () => {},
  logOutUser: () => {},

  updateNews: () => {},
  updateGuessHistory: () => {},

  setLoad: () => {},
  setLogin: () => {},
  setUserId: () => {},
  setNews: () => {},
  setGuesses: () => {},
});

const RedanewsProvider = (props) => {
  const [load, setLoad] = useState(false);
  const [login, setLogin] = useState(false);

  const [user, setUser] = useState({
    username: "",
    email: "",
  });

  const [userId, setUserId] = useState("");

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

  const [history, setHistory] = useState([
    {
      guess_id: 123,
      correctCnt: 5,
      guessesCnt: 100,
      news_id: 12323,
      newsTitle: "aakdsa ddksdos ",
      newsDate: "2022-12-15",
      newsLink: "https://www.euronews.com/tag/die-linke",
    },
  ]);

  const loginUser = (userInfo) => {
    setLogin(true);
    setUserId(userInfo.userId);
    setUser(...user, userInfo);
    setGuessId(userInfo.guessId);

    setCookie("userId", userInfo.userId, 5);
    setCookie("guessId", userInfo.guessId, 5);
  };

  const logOutUser = () => {
    setLogin(false);
    setUser({});
    setUserId("");
    setGuessId("");

    deleteCookie("userId");
    deleteCookie("guessId");
  };

  const updateNews = (newsToUpdate) => {
    setNews(newsToUpdate);
  };

  const updateGuessHistory = (newHistory) => {
    setHistory(newHistory);
  };

  return (
    <RedanewsContext.Provider
      value={{
        load,
        login,
        user,
        userId,
        news,
        trendingNews,
        guessId,
        guesses,
        history,
        setLoad,
        setLogin,
        setUserId,
        loginUser,
        logOutUser,
        setNews,
        updateNews,
        setTrendingNews,
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
