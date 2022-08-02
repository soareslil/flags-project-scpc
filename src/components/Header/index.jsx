import React from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";

function Header() {

  let navigate = useNavigate();

  return (
    <header className="header-main">
      <img
        className="header-logo"
        alt="logo"
        src="%PUBLIC_URL%/../Images/logo.svg"
      />
      <nav className="header-nav">
        <div>
          <img
            className="header-icons"
            alt="logo"
            src="%PUBLIC_URL%/../Images/schedule.png"
          />
          <button
            type="button"
            onClick={() => navigate('/schedule')}
            className="header-p"
          >
            Schedule
          </button>
        </div>
        <div>
          <img
            className="header-icons"
            alt="logo"
            src="%PUBLIC_URL%/../Images/leaderboard.png"
          />
          <button
            type="button"
            onClick={() => navigate('/leaderboard')}
            className="header-p"
          >
            Leaderboard
          </button>{" "}
        </div>
      </nav>
    </header>
  );
}

export default Header;
