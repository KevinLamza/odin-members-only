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

const getUserByEmail = async (email) => {
    const { rows } = await pool.query('SELECT * FROM users WHERE email = $1', [
        email,
    ]);
    return { rows };
};

const getUserById = async (id) => {
    const { rows } = await pool.query('SELECT * FROM users WHERE id = $1', [
        id,
    ]);
    return { rows };
};

module.exports = {
    insertUser,
    getUserByEmail,
    getUserById,
};
