const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const { getUserByEmail, getUserById } = require('../database/queries.js');

passport.use(
    new LocalStrategy(
        { usernameField: 'email' },
        async (email, password, done) => {
            try {
                const { rows } = await getUserByEmail(email);
                const user = rows[0];

                console.log(user);

                if (!user) {
                    return done(null, false, { message: 'Incorrect email' });
                }
                const match = await bcrypt.compare(password, user.password);
                if (!match) {
                    return done(null, false, { message: 'Incorrect password' });
                }
                return done(null, user);
            } catch (error) {
                return done(error);
            }
        },
    ),
);

passport.serializeUser((user, done) => {
    // @ts-ignore
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const { rows } = await getUserById(id);
        const user = rows[0];

        done(null, user);
    } catch (error) {
        done(error);
    }
});

const isAuthenticated = passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/log-in',
});

module.exports = {
    isAuthenticated,
};
