/**
 * A class representing a service that processes the data for match schedule
 * and generates leaderboard.
 * 
 * NOTE: MAKE SURE TO IMPLEMENT ALL EXISITNG METHODS BELOW AND
 *       PLEASE DO NOT RENAME, MOVE OR DELETE THIS FILE.  
 */

 import axios from "axios";

 const api = axios.create({
    baseURL: "http://localhost:3001",
  });
class LeagueService {    
    
    /**
     * Sets the match schedule.
     * Match schedule will be given in the following form:
     * [
     *      {
     *          matchDate: [TIMESTAMP],
     *          stadium: [STRING],
     *          homeTeam: [STRING],
     *          awayTeam: [STRING],
     *          matchPlayed: [BOOLEAN],
     *          homeTeamScore: [INTEGER],
     *          awayTeamScore: [INTEGER]
     *      },
     *      {
     *          matchDate: [TIMESTAMP],
     *          stadium: [STRING],
     *          homeTeam: [STRING],
     *          awayTeam: [STRING],
     *          matchPlayed: [BOOLEAN],
     *          homeTeamScore: [INTEGER],
     *          awayTeamScore: [INTEGER]
     *      }    
     * ]
     * 
     * @param {Array} matches List of matches.
     */    

    getToken() {
        return (
            api.get("/api/v1/getAccessToken")
            .then(function ({ data }) {
                const token = data.access_token;
                return token;
            })
            .catch(function (error) {
                console.log(error);
            })
        );
    };

    setMatches(matches) { 
    }
    
    /**
     * Returns the full list of matches.
     * 
     * @returns {Array} List of matches.
     */
    getMatches(token) {
        return(
            api
            .get("/api/v1/getAllMatches", {
                headers:{"Authorization": `Bearer ${token}`}
            })
            .then(function ( { data: { matches }} ) {
                return matches;
            })
            .catch(function (error) {
                console.log(error); 
            })
        )
    }
    
    /**
     * Returns the leaderboard in a form of a list of JSON objecs.
     * 
     * [     
     *      {
     *          teamName: [STRING]',
     *          matchesPlayed: [INTEGER],
     *          goalsFor: [INTEGER],
     *          goalsAgainst: [INTEGER],
     *          points: [INTEGER]     
     *      },      
     * ]       
     * 
     * @returns {Array} List of teams representing the leaderboard.
     */
    getLeaderboard(matches, team) {
        let GF = 0;
        let GA = 0;
        let wins = 0;
        let draw = 0;

        const matchHomeTeam = matches.filter(({ homeTeam })=> homeTeam === team);
        const matchAwayTeam =  matches.filter(({ awayTeam })=> awayTeam === team);
  
        matchHomeTeam.forEach(({ homeTeamScore }) => GF += homeTeamScore);
        matchAwayTeam.forEach(({ awayTeamScore })=> GF += awayTeamScore);
   
        matchHomeTeam.forEach(({ awayTeamScore })=> GA += awayTeamScore);
        matchAwayTeam.forEach(({ homeTeamScore })=> GA += homeTeamScore);

        matchHomeTeam.forEach(({ homeTeamScore, awayTeamScore })=> {
           if(homeTeamScore === awayTeamScore) draw++;
           if(homeTeamScore > awayTeamScore) wins++;
        });

        matchAwayTeam.forEach(({ homeTeamScore, awayTeamScore })=>{
            if(homeTeamScore === awayTeamScore) draw++;
            if(homeTeamScore < awayTeamScore) wins++;
         })

        const MP = matchAwayTeam.length + matchHomeTeam.length;
        const GD = GF - GA;
        const points = (wins * 3) + draw;

        const teamInfo = {
            country: team,
            MP,
            GF,
            GA,
            GD,
            points,
        };

        return teamInfo;
    }
    
    /**
     * Asynchronic function to fetch the data from the server.
     */
    async fetchData(token) {
        const headers = { headers: {"Authorization": `Bearer ${token}`} };
        return (
            api.get("/api/v1/getAllMatches", headers)
            .then(({ data: { matches }}) => {
                return matches;
            })
            .catch((error) => {
                console.log(error)
            })
        );
    };

    getVersion() {
        return (
            api.get("/api/version")
            .then(({ data }) => {
                const version = data.version;
                return version;
            })
            .catch((error) => {
                console.log(error)
            })
        );
    };
};

export default LeagueService;
