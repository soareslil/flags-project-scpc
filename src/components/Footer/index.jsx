import React, { useState } from "react";
import "./style.css";
import LeagueService from "../../services/LeagueService.js";

function Footer() {
  const [version, setVersion] = useState(null);

  const api = new LeagueService();

  async function getVersionFromApi() {
    const result = await api.getVersion();
    return setVersion(result);
  }

  getVersionFromApi();

  return (
    <footer className="footer-main">
      {version !== null && <p>API version: {version}</p>}
    </footer>
  );
}

export default Footer;
