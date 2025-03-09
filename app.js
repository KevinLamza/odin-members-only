require('dotenv').config();
const path = require('node:path');
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const { routes } = require('./routes/routes.js');

const PORT = process.env.APP_PORT || 3000;

// SETUP EXPRESS SERVER AND SET VIEWS
const app = express();
app.use(express.urlencoded({ extended: true }));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// ROUTES
app.use('/', routes);

// LISTENING
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
