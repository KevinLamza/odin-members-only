const { Router } = require('express');
const {
    authenticateUser,
    isAuthenticated,
    logOut,
} = require('../configs/passport.js');
// const controller = require('../controllers/controller.js');

const {
    validateUser,
    validateClubPassphrase,
    validateAdminPassphrase,
    getIndexPage,
    getCreateUser,
    postCreateUser,
    getLoginPage,
    getNewMessagePage,
    postNewMessage,
    getJoinTheClubPage,
    postJoinTheClubPage,
    getBecomeAdminPage,
    postBecomeAdminPage,
    postDeleteMessage,
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
routes.post('/joinTheClub', validateClubPassphrase, postJoinTheClubPage);
routes.get('/becomeAdmin', isAuthenticated, getBecomeAdminPage);
routes.post('/becomeAdmin', validateAdminPassphrase, postBecomeAdminPage);
routes.post('/deleteMessage', postDeleteMessage);
routes.get('/log-out', logOut);

module.exports = { routes };
