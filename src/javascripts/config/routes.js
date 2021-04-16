//TODO

import express from 'express'

import { indexPage } from '../controllers/index'

let router = express.Router() 


export function configureRoutes(app) { 
    router.get('/', indexPage)

    
    app.use('/', router)
}