import React, { useEffect, useState } from "react";
import "./style.css";
import LeagueService from "../../services/LeagueService.js";

function Schedule() {
  const [matches, setMatches] = useState(false);
  const [token, setToken] = useState(false);

  const api = new LeagueService();

  (async function getTokenFromApi(){
    const result = await api.getToken();
    return setToken(result);
  })();

  useEffect(() => {
    if (token) {
      (async function getMatchesFromApi() {
        const result = await api.fetchData(token);
        result.map((item)=>{
            const dateItem = new Date(item.matchDate);
            item.date = `${dateItem.getDate()}.${dateItem.getMonth()+1}.${dateItem.getFullYear()}`;
            item.hour = `${dateItem.getHours()}:${dateItem.getMinutes()}`
            return item;
        });
        return setMatches(result);
      })();
    }
  }, [token]);

  return (
    <>
      <header className="header-schedule">
        <h2 className="h2-schedule">League Schedule</h2>
        <div className="div-schedule">
          <p className="invisible">Date/Time</p>
          <p className="invisible-stadium stadium-header">Stadium</p>
          <div className="div-teams">
            <p>Home Team</p>
            <p>Away Team</p>
          </div>
        </div>
      </header>

      {matches && matches.map((element, index) => {
          return (
          <section className="section-1" key={index} style={{backgroundColor: index % 2 === 0 ? '#FFFF' : '#F6F7F7'}}>
            <div className="sec1-dateTime">
              <p>{element.date}</p>
              <p>{element.hour}</p>
            </div>
            <p className="invisible-stadium">{element.stadium}</p>
            <div className="match-countries">
              <p className="flag-name-home">{element.homeTeam}</p>
              <img alt="flag" src={`https://countryflagsapi.com/png/${element.homeTeam}`} />
              <div>
                <p>
                  {element.homeTeamScore} : {element.awayTeamScore}
                </p>
              </div>
              <img alt="flag" src={`https://countryflagsapi.com/png/${element.awayTeam}`} />
              <p className="flag-name-away">{element.awayTeam}</p>
            </div>
          </section>
          );
        })}
    </>
  );
}

export default Schedule;
