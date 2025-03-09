const { Pool } = require('pg');

module.exports = new Pool({
    host: process.env.DB_HOST,
});
