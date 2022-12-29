import { createContext, useContext, useState } from 'react';

const ADD_MESSAGE_COLOR = '#3d84b8';
const REGULAR_MESSAGE_COLOR = '#2b2e4a';
const ERROR_MESSAGE_COLOR = '#fb3640';

const ScoreCardContext = createContext({
  /*messages: [],

  addCardMessage: () => {},
  addRegularMessage: () => {},
  addErrorMessage: () => {},*/
  isLogin: Boolean,
  setIsLogin: ()=>{},
});

const ScoreCardProvider = (props) => {
  const [isLogin, setIsLogin] = useState(true)

  return (
    <ScoreCardContext.Provider
      value={{
        isLogin, setIsLogin
      }}
      {...props}
    />
  );
};

function useScoreCard() {
  return useContext(ScoreCardContext);
}

export { ScoreCardProvider, useScoreCard };
