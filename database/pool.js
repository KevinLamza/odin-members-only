const { Pool } = require('pg');

module.exports = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PW,
    port: Number(process.env.DB_PORT),
});
