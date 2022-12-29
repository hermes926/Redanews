// React Utils, UI Components
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// User-defined Components, Container
import Home from "./Home";
import Login from "./Auth/Login";
import SignUp from "./Auth/SignUp";
import GuessGame from "./Game/GuessGame";

import Header from "../Components/Header";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<><Header /><Home /></>} />
          <Route path="/login" element={<><Header /><Login /></>} />
          <Route path="/signup" element={<><Header /><SignUp /></>} />
          <Route path="/game" element={<><Header /><GuessGame /></>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
