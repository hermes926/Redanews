// React Utils, UI Components
import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Box, Container } from "@chakra-ui/react";

// User-defined Components, Container
import Setting from "./Setting";
import History from "./History";

const Account = () => {
  return (
    <Routes>
      <Route path="setting" element={<Setting />} />
      <Route path="history" element={<History />} />
      <Route path="/" element={<History />} />
    </Routes>
  );
};

export default Account;
