import styled from "styled-components";
import Paper from "@material-ui/core/Paper";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Header from "../Components/Header";
//import Body from "./Body";
import Game from "./Game"
import Home from "./Home";
import Login from "./Accounts/Login";
import SignUp from "./Accounts/SignUp";
import GuessGame from "./Game/GuessGame";

function App() {
  return (
    <>
      <Header />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/game" element={<GuessGame />} />

        </Routes>
      </Router>
    </>
  );
}

export default App;
