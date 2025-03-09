require('dotenv').config();
const path = require('node:path');
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { routes } = require('./routes/routes.js');

const PORT = process.env.APP_PORT || 3000;

// SETUP EXPRESS SERVER
const app = express();

// PARSER TO HANDLE FORM DATA IN FORM REQUESTS
app.use(express.urlencoded({ extended: true }));

// INITIALIZE SESSION
app.use(session({ secret: 'cats', resave: false, saveUninitialized: false }));

// MAKE PASSPORT USE THE INITIALIZED SESSION
// MUST BE AFTER SESSION MIDDLEWARE AND BEFORE ROUTE MIDDLEWARE
app.use(passport.initialize());
app.use(passport.session());

// SET VIEWS
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// ROUTES
app.use('/', routes);

// LISTENING
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
