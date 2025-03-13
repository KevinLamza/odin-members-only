const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const { getUserByEmail, getUserById } = require('../database/queries.js');

passport.use(
    new LocalStrategy(
        { usernameField: 'email' },
        async (email, password, done) => {
            try {
                console.log('hello2');
                const { rows } = await getUserByEmail(email);
                const user = rows[0];

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

const authenticateUser = function (req, res, next) {
    passport.authenticate('local', function (err, user, info) {
        if (err) {
            return next(err);
        }
        if (!user) {
            console.log(info.message);
            return res.render('log-in', { errors: [{ msg: info.message }] });
        }

        req.login(user, next);
    })(req, res, next);
};

const isAuthenticated = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        res.redirect('/log-in');
    }
};

const logOut = (req, res, next) => {
    if (req.user) {
        req.logout(function (err) {
            if (err) {
                return next(err);
            }
            res.redirect('/');
        });
    } else {
        res.redirect('/');
    }
};

module.exports = {
    authenticateUser,
    isAuthenticated,
    logOut,
};
