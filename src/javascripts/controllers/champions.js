import {Champion} from '../models/Champion'
import { riotKey } from "../config/vars";

export const getChampionByIDAPI = (req, res, next) => {

    const champID = req.params.champID; 

    Champion.find({key: champID}).exec((err, champion) => {
        if (err) {
            res.status(404);
            res.end();
        } else {
            res.status(200).json(champion);
            res.end();
        }
    })
}

export const getTopChampMastery = (req, res, next) => {
    let champMastery;
    let topMastery;
    const request = require("request");
    request(
      `https://na1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${req.params.summonerID}?api_key=${riotKey}`,
      function (error, response, body) {
        if (!error && response.statusCode == 200) {
          champMastery = JSON.parse(body);
          topMastery = champMastery.slice(0,5);
          res.status(200).json(topMastery);
          res.end();
        }
        else {
            res.status(404);
            res.end();
        }
      }
    );

}