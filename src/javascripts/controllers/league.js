import {riotKey} from '../config/vars'

export const getSoloRankAPI = (req, res, next) => {
    let summonerRankList;
    let soloRank;
    const request = require("request");
    request(
      `https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/${req.params.summonerID}?api_key=${riotKey}`,
      function (error, response, body) {
        if (!error && response.statusCode == 200) {
          summonerRankList = JSON.parse(body);
          for (let i = 0; i < summonerRankList.length; i++) {
            if (summonerRankList[i].queueType == "RANKED_SOLO_5x5") {
               soloRank = summonerRankList[i]; 
               break;
            }
          }
          res.status(200).json(soloRank);
          res.end();
        }
        else {
            res.status(404).json(error);
            res.end();
        }
      }
    );
  };

  export const getSoloRankEntriesAPI = (req, res, next) => {
    var rankEntries;
    const request = require("request");
    request(
      `https://na1.api.riotgames.com/lol/league/v4/leagues/${req.params.leagueID}?api_key=${riotKey}`,
      function (error, response, body) {
        if (!error && response.statusCode == 200) {
            rankEntries = JSON.parse(body);
            res.status(200).json(rankEntries);
            res.end();
        }
        else {
            res.status(404).json(error);
            res.end();
        }
      }
    );
  };
  
  