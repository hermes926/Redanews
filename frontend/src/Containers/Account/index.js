// React Utils, UI Components
import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Box, Container } from "@chakra-ui/react";

// User-defined Components, Container
import AccountInfo from "./AccountInfo";
import History from "./History";

const Account = () => {
  return (
    <Routes>
      <Route path="/" element={<AccountInfo />} />
      <Route path="history" element={<History />} />
    </Routes>
  );
};

export default Account;
