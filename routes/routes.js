const { Router } = require('express');
// const controller = require('../controllers/controller.js');

const {
    validateUser,
    getIndexPage,
    getCreateUser,
    postCreateUser,
} = require('../controllers/controller.js');

// const routes = express.Router();

const routes = Router();

routes.get('/', getIndexPage);
routes.get('/sign-up', getCreateUser);
routes.post('/sign-up', validateUser, postCreateUser);

module.exports = { routes };
