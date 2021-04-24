import { riotKey } from "../config/vars";


export const getMatchHistoryAPI = (req, res, next) => {
    let matchResult;
    let matchList;
    let recentMatches; 
    const request = require("request");
    request(
      `https://na1.api.riotgames.com/lol/match/v4/matchlists/by-account/${req.params.accountID}?api_key=${riotKey}`,
      function (error, response, body) {
        if (!error && response.statusCode == 200) {
          matchResult = JSON.parse(body);
          matchList = matchResult.matches;
          recentMatches = matchList.slice(0,5);
          res.status(200).json(recentMatches);
          res.end();
        }
        else {
            res.status(404);
            res.end();
        }
      }
    );
}

export const getMatchResultAPI = (req, res, next) => {
    let match;
    let participants;
    let summoner; 
    let result = {};
    const request = require("request");
    request(
      `https://na1.api.riotgames.com/lol/match/v4/matches/${req.params.gameID}?api_key=${riotKey}`,
      function (error, response, body) {
        if (!error && response.statusCode == 200) {
          match = JSON.parse(body);
          //get matchs unix gameCreation timestamp
          result.date = new Date(match.gameCreation);
          participants = match.participants;
          summoner = participants.filter(obj => {
            return obj.championId == req.params.champion
          })
          result.win = summoner[0].stats.win;
          result.kills = summoner[0].stats.kills;
          result.deaths = summoner[0].stats.deaths; 
          result.assists = summoner[0].stats.assists;
          res.status(200).json(result);
          res.end();    
        }
        else {
            res.status(404).json(body);
            res.end();
        }
      }
    );
}

