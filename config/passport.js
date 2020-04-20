const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const db = require("../models");
const bcrypt = require("bcryptjs");

passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {

    db.User.findOne({
        where: {
            email: email
        }
    }).then(user => {
        if (!user) return done(null, false, { message: 'Email not found.' });

        bcrypt.compare(password, user.password).then((match) => {
            if (match) {
                return done(null, user);
            } else {
                return done(null, false, { message: 'Incorrect password.' });
            }
        });
    })
}))

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(async function (id, done) {
    const user = await db.User.findAll({ id: id })
    done(null, user);
});

module.exports = passport;