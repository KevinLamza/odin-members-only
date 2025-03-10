const { Router } = require('express');
const { authenticateUser, isAuthenticated } = require('../configs/passport.js');
// const controller = require('../controllers/controller.js');

const {
    validateUser,
    getIndexPage,
    getCreateUser,
    postCreateUser,
    getLoginPage,
    getProtectedPage,
} = require('../controllers/controller.js');

// const routes = express.Router();

const routes = Router();

routes.get('/', getIndexPage);
routes.get('/sign-up', getCreateUser);
routes.post('/sign-up', validateUser, postCreateUser);
routes.get('/log-in', getLoginPage);
routes.post('/log-in', authenticateUser);
routes.get('/protected', isAuthenticated, getProtectedPage);

module.exports = { routes };
