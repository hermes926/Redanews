import { createContext, useContext, useEffect, useState } from "react";
import { setCookie, deleteCookie, getCookie } from "../Utils/CookieUsage";

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
  win: Boolean,
  difficulty: String,

  loginUser: () => {},
  logOutUser: () => {},

  updateUser: () => {},
  updateNews: () => {},
  updateGuessHistory: () => {},

  setLoad: () => {},
  setLogin: () => {},
  setUserId: () => {},
  setNews: () => {},
  setGuesses: () => {},
  setWin: () => {},
  setDifficulty: () => {},
});

const RedanewsProvider = (props) => {
  const [load, setLoad] = useState(false);
  const [login, setLogin] = useState(false);
  const [difficulty, setDifficulty] = useState("Hard");

  const [user, setUser] = useState({
    username: "",
    email: "",
  });

  const [userId, setUserId] = useState(getCookie("userId"));

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

  const [guessId, setGuessId] = useState(getCookie("guessId"));
  const [guesses, setGuesses] = useState([]);
  const [win, setWin] = useState(false);

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
    setUser(userInfo);

    if (userInfo.userId) {
      setUserId(userInfo.userId);
      setCookie("userId", userInfo.userId, 5);
    }

    if (userInfo.guessId) {
      setGuessId(userInfo.guessId);
      setCookie("guessId", userInfo.guessId, 5);
    }
  };

  const updateUser = (userInfo) => {
    setUser({ username: userInfo.username, email: userInfo.email });
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
        win,
        history,
        setLoad,
        setLogin,
        setUserId,
        loginUser,
        logOutUser,
        updateUser,
        setNews,
        updateNews,
        setTrendingNews,
        setGuesses,
        setWin,
        updateGuessHistory,
        difficulty,
        setDifficulty,
      }}
      {...props}
    />
  );
};

function useRedanews() {
  return useContext(RedanewsContext);
}

export { RedanewsProvider, useRedanews };
