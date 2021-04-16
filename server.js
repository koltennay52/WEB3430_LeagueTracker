
import {configureRoutes} from './src/javascripts/config/routes';
// import {strategy} from './src/javascripts/config/passport';
// import passport from 'passport';


let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');

import {connect} from './src/javascripts/config/db/connect';
connect('mongodb://localhost:27017/leaguetracker');

export let app = express();

// Configure middleware
app.set('views', path.join(__dirname, 'src', 'javascripts', 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

// Authentication
// passport.use(strategy);
// app.use(passport.initialize());

//Routes
configureRoutes(app);

// Error handling
app.use(function(req, res, next) {
    next(createError(404));
})

app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('layout', {error: err, status: err.status, content: 'error'});
})

// Web server
let http = require('http');
let server = http.createServer(app);

server.listen(process.env.PORT || '8080');

server.on('error', err => {
    throw err;
});

server.on('listening', () => {
    let address = server.address();
    let bind = typeof address === 'string' ? address : address.port;
    console.log(`Listening on ${bind}`);
});




