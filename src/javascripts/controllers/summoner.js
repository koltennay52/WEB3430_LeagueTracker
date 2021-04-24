import { riotKey } from "../config/vars";

export const getSummonerDetailsAPI = (req, res, next) => {
  let summonerDetails;
  const request = require("request");
  request(
    `https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${req.params.summonerName}?api_key=${riotKey}`,
    function (error, response, body) {
      if (!error && response.statusCode == 200) {
        summonerDetails = JSON.parse(body);
        res.status(200).json(summonerDetails);
        res.end();
      }
      else {
          res.status(404);
          res.end();
      }
    }
  );
};


