import passport from "passport";
import { User } from "../models/user";
import {getUser} from "../config/routes"

export const registerUserAPI = (req, res, next) => {
  let user = new User();

  user.summonerName = req.body.summonerName;
  user.email = req.body.email;
  user.setPassword(req.body.password);

  user.save((err) => {
    if (err) {
      res.json({ success: false, message: "Unable to register summoner" });
      res.end();
    } else {
      res.end();
    }
  });
};

export const signUserInAPI = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      res.status(404).json(err);
      res.end();
    } else {
      if (user) {
        let token = user.generateJWT();
        res.cookie("token", token, { maxAge: 1000 * 60 * 60 * 24 });
        res.end();
      } else {
        res.status(401);
        res.end();
      }
    }
  })(req, res, next);
};

export const getSummonerNameAPI = (req, res, next) => {
  const token = getUser(req.cookies.token);

  if (token) {
    const summonerName = token.summonerName;
    res.status(200).json(summonerName);
    res.end();
  } else {
    res.status(404);
    res.end();
  }
};
