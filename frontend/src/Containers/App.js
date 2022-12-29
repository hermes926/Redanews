// React Utils, UI Components
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// User-defined Components, Container
import Home from "./Home";
import Login from "./Auth/Login";
import SignUp from "./Auth/SignUp";
import GuessGame from "./Game/GuessGame";
import Account from "./Account/index";

import Header from "../Components/Header";

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
          <Route path="/account/*" element={<Account />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
