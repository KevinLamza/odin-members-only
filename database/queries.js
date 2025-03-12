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

const insertNewMessage = async (user_id, message) => {
    await pool.query(
        'INSERT INTO messages (user_id, message, created_at) VALUES ($1, $2, $3)',
        [user_id, message, 'NOW()'],
    );
};

const selectAllMessages = async () => {
    const { rows } = await pool.query(
        'SELECT message, created_at, first_name, last_name FROM messages LEFT JOIN users ON messages.user_id = users.id ORDER BY created_at DESC',
    );
    return { rows };
};

const updateMemberStatus = async (user_id) => {
    await pool.query('UPDATE users SET is_member = true WHERE id = $1', [
        user_id,
    ]);
};

const updateAdminStatus = async (user_id) => {
    await pool.query('UPDATE users SET is_admin = true WHERE id = $1', [
        user_id,
    ]);
};

module.exports = {
    insertUser,
    getUserByEmail,
    getUserById,
    insertNewMessage,
    selectAllMessages,
    updateMemberStatus,
    updateAdminStatus,
};
