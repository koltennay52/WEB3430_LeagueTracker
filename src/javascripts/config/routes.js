//TODO

import express from 'express'
import jwt from 'jsonwebtoken'
import { indexPage, registerPage, loginPage } from '../controllers/index'
import { registerUserAPI, signUserInAPI, getSummonerNameAPI } from '../controllers/users'
import { getSummonerDetailsAPI, getSoloRankAPI } from '../controllers/summoner'
import { getTopChampMasteryAPI, getChampionByIDAPI } from '../controllers/champions'
import { getMatchHistoryAPI, getMatchResultAPI } from '../controllers/match'

import { APP_SECRET } from './vars';

let router = express.Router() 


export function configureRoutes(app) { 
    
    app.all('*', (req, res, next) => {
        app.locals.signedIn = isSignedIn(req);
        app.locals.getCurrentUser = getCurrentUser(req);
        next();
    })

    //Pages
    router.get('/', indexPage)
    router.get('/register', registerPage)
    router.get('/login', loginPage)

    //USERS API
    router.post('/api/v1/users/register', registerUserAPI)
    router.post('/api/v1/users/signin', signUserInAPI)
    router.get('/api/v1/users/getSummonerName', getSummonerNameAPI);

    //RIOT API
    //Summoner
    router.get('/api/summoner/summonerDetails/:summonerName', getSummonerDetailsAPI);
    router.get('/api/summoner/soloRank/:summonerID', getSoloRankAPI);
    //Champion
    router.get('/api/champions/mastery/:summonerID', getTopChampMasteryAPI);
    router.get('/api/champions/:champID', getChampionByIDAPI);
    //Matches
    router.get('/api/matches/:accountID', getMatchHistoryAPI);
    router.get('/api/matches/result/:gameID/:champion', getMatchResultAPI);


    app.use('/', router)
} 


export function getCurrentUser(req) {
    if (req.cookies.token) {
        return jwt.decode(req.cookies.token, APP_SECRET);
    } else {
        return null;
    }
}

export function getUser(token) {
    if (token) {
        return jwt.decode(token, APP_SECRET);
    } else {
        return null;
    }
}

function isSignedIn(req) {
    try {
        jwt.verify(req.cookies.token, APP_SECRET);
        return true;
    } catch (err) {
        return false;
    }
}

function requireSignIn(req, res, next) {
    if (isSignedIn(req)) {
        next();
    } else {
        res.status(401);
        res.render('layout', {content: 'login'});
    }
}