const { Router } = require('express');
const {
    authenticateUser,
    isAuthenticated,
    logOut,
} = require('../configs/passport.js');
// const controller = require('../controllers/controller.js');

const {
    validateUser,
    validatePassphrase,
    getIndexPage,
    getCreateUser,
    postCreateUser,
    getLoginPage,
    getNewMessagePage,
    postNewMessage,
    getJoinTheClubPage,
    postJoinTheClubPage,
} = require('../controllers/controller.js');

// const routes = express.Router();

const routes = Router();

routes.get('/', getIndexPage);
routes.get('/sign-up', getCreateUser);
routes.post('/sign-up', validateUser, postCreateUser);
routes.get('/log-in', getLoginPage);
routes.post('/log-in', authenticateUser);
routes.get('/newMessage', isAuthenticated, getNewMessagePage);
routes.post('/newMessage', postNewMessage);
routes.get('/joinTheClub', isAuthenticated, getJoinTheClubPage);
routes.post('/joinTheClub', validatePassphrase, postJoinTheClubPage);
routes.get('/log-out', logOut);

module.exports = { routes };
