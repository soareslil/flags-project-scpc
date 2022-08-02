import React, { useEffect, useState } from "react";
import "./style.css";
import LeagueService from "../../services/LeagueService.js";

function Leaderboard() {
  const [token, setToken] = useState(false);
  const [matches, setMatches] = useState(false);
  const [countriesInfos, setCountriesInfos] = useState(false);

  const api = new LeagueService();

  (async function getTokenFromApi(){
    const result = await api.getToken();
    return setToken(result);
  })();

  function sortByPoints(){
    countriesInfos.sort((a, b) => {
      const points = a.points - b.points;
      const GD = a.GD - b.GD;
      const GF = a.GF - b.GF;
      const name = a.country - b.country;
      
      if (a.points !== b.points) {
        return points;
      } else if (a.GD !== b.GD) {
        return GD;
      } else if (a.GF !== b.GF) {
        return GF;
      } else if (a.country !== b.country) {
        return name;
      }
    });
    countriesInfos.reverse();

    return countriesInfos.map((element, index) => {
      return (
        <section className="section-leader" key={index} >
          <div className="div-img-team">
            <img
            className="flag-name"
              src={`https://countryflagsapi.com/png/${element.country}`}
              alt="flag"
            />
            <p>{element.country}</p>
          </div>
          <div className="sec-div-teams">
            <p>{element.MP}</p>
            <p className="invisible">{element.GF}</p>
            <p className="invisible">{element.GA}</p>
            <p className="GD">{element.GD}</p>
            <p className="points">{element.points}</p>
          </div>
        </section>
      );
    });
  };
  

  useEffect(() => {
    if (token) {
      (async function getMatchesFromApi(){
        const result = await api.fetchData(token);
        return setMatches(result);
      })();
    }
  }, [token]);

  useEffect(() => {
    if (matches) {
      const countries = [];
      const countriesInfos = [];

      for (let i = 0; i < matches.length; i++) {
        if (!countries.includes(matches[i].homeTeam)) countries.push(matches[i].homeTeam);
        if (!countries.includes(matches[i].awayTeam)) countries.push(matches[i].awayTeam);
      }

      (async function getTeamInfos(){
        for (let i = 0; i < countries.length; i++) {
          countriesInfos.push(await api.getLeaderboard(matches, countries[i]));
        }
        setCountriesInfos(countriesInfos);
      })();
    }
  }, [matches]);

  return (
    <div className="div-master">
      <header className="header-leaderboard">
        <h2 className="h2-leaderboard">League Standings</h2>
        <div className="div-leaderboard">
          <p className="name-team">Team Name</p>
          <div className="div-teams-score">
            <p>MP</p>
            <p className="invisible">GF</p>
            <p className="invisible">GA</p>
            <p className="GD">GD</p>
            <p>Points</p>
          </div>
        </div>
      </header>
      {countriesInfos && sortByPoints()}
    </div>
  );
}

export default Leaderboard;
