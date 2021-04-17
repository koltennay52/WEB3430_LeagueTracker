//TODO

import express from 'express'

import { indexPage } from '../controllers/index'

let router = express.Router() 


export function configureRoutes(app) { 
    router.get('/', indexPage)

    
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
