const { Router } = require('express');
const { isAuthenticated } = require('../configs/passport.js');
// const controller = require('../controllers/controller.js');

const {
    validateUser,
    getIndexPage,
    getCreateUser,
    postCreateUser,
    getLoginPage,
} = require('../controllers/controller.js');

// const routes = express.Router();

const routes = Router();

routes.get('/', getIndexPage);
routes.get('/sign-up', getCreateUser);
routes.post('/sign-up', validateUser, postCreateUser);
routes.get('/log-in', getLoginPage);
routes.post('/log-in', isAuthenticated);

module.exports = { routes };
