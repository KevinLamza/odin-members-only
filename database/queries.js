const pool = require('./pool.js');

const insertUser = async (
    firstName,
    lastName,
    email,
    password,
    isMember,
    isAdmin,
) => {
    await pool.query(
        'INSERT INTO users (first_name, last_name, email, password, is_member, is_admin) VALUES ($1, $2, $3, $4, $5, $6)',
        [firstName, lastName, email, password, isMember, isAdmin],
    );
};

module.exports = {
    insertUser,
};
