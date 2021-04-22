import {riotKey} from '../config/vars'

export const getSummonerDetailsAPI = (req, res, next) => {
    fetch(`https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${req.params.summonerName}?api_key=${riotKey}`)
      .then(response => response.text())
      .then(data => {
        const detailsResponse = JSON.parse(data);
        res.status(200).json(detailsResponse)
        res.end();
      }).catch(error => {
        res.status(404); 
        res.end();
      })  
}