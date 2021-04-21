import {Champion} from '../models/Champion'

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

