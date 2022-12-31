// React Utils, UI Components
import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { Box, Container } from "@chakra-ui/react";

// User-defined Components, Container
import AccountInfo from "./AccountInfo";
import History from "./History";

// Functions, Utils
import { getCookie } from "../../Utils/CookieUsage";
import fetchUser from "../utils/fetchUser";

import { useRedanews } from "../../Hooks/useRedanews";

const Account = () => {
  const [fetchAccount, setFetchAccount] = useState(false);
  const { loginUser } = useRedanews();
  const navigate = useNavigate();

  useEffect(() => {
    const updateUser = async () => {
      const id = getCookie("userId");
      if (id === "" || id === undefined) {
        navigate("/");
      } else {
        await fetchUser(id, loginUser, (flag) => setFetchAccount(flag));
      }
    };
    updateUser();
  }, []);

  if (fetchAccount)
    return (
      <Routes>
        <Route path="/" element={<AccountInfo />} />
        <Route path="history" element={<History />} />
      </Routes>
    );
  else return <></>;
};

export default Account;
