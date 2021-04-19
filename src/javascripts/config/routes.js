//TODO

import express from 'express'

import { indexPage, registerPage, loginPage } from '../controllers/index'
import { registerUserAPI, signUserInAPI } from '../controllers/users'

let router = express.Router() 


export function configureRoutes(app) { 
    router.get('/', indexPage)
    router.get('/register', registerPage)
    router.get('/login', loginPage)



    //USERS API
    router.post('/api/users/register', registerUserAPI)
    router.post('/api/users/signin', signUserInAPI)
    


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
