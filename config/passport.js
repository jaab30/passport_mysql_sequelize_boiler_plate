const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const db = require("../models");
const bcrypt = require("bcryptjs");

// passport setup for the "Local Strategy". If you are using username instead of email, don't include { usernameField: 'email' }.
passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
    // check for user in database
    db.User.findOne({
        where: {
            email: email
        }
    }).then(user => {
        // if user was not found return false for user and pass an error message
        if (!user) return done(null, false, { message: 'Email not found.' });
        // compare the password with the "hashed" password"
        bcrypt.compare(password, user.password).then((match) => {
            if (match) {
                // if match return user
                return done(null, user);
            } else {
                // if it doen's match, return false for user and pass an error message
                return done(null, false, { message: 'Incorrect password.' });
            }
        });
    })
}))

// passport boiler plate to serialize and deserialize user

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(async function (id, done) {
    const user = await db.User.findAll({ id: id })
    done(null, user);
});

module.exports = passport;