import React from "react";
import { Routes, Route } from "react-router-dom";

import Schedule from "../components/Schedule";
import Leaderboard from "../components/Leaderboard";
import NotFound from "../components/NotFound";

const Router = () => {
  return (
      <Routes>
        <Route element={<Schedule />} path="/" exact />
        <Route element={<Schedule />} path="/schedule" />
        <Route element={<Leaderboard />} path="/leaderboard" />
        <Route path="*" element={  <NotFound/>} />
      </Routes>
  );
};

export default Router;
