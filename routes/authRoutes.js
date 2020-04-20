const router = require("express").Router();
const bcrypt = require('bcryptjs');
const db = require("../models");
const passport = require("../config/passport");
const auth = require("../middleware/auth");

// route: /auth
router.post("/register", async (req, res) => {

    try {
        const { email, password, passwordTwo } = req.body;

        if (!email || !password || !passwordTwo) res.status(400).json({ message: "Please fill all fields" });

        var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        if (reg.test(email) == false) res.status(400).json({ message: "Invalid email format" });

        if (password.length < 6) res.status(400).json({ message: "Password needs to be at least 6 characters" });

        if (password !== passwordTwo) res.status(400).json({ message: "Passwords don't match" });

        const user = await db.User.findOne({ where: { email: email } })

        if (user) {
            res.status(400).json({ message: "User already Registered. Please, LogIn" })
        } else {

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(password, salt, function (err, hash) {
                    if (err) throw err;

                    db.User.create({
                        email,
                        password: hash
                    })
                        .then(data => {
                            const { id, email } = data;
                            res.json({
                                id,
                                email
                            });
                        })
                        .catch(err => console.log(err));
                });
            });
        }
    } catch (err) {
        if (err) res.status(500).json({ message: "Internal Error" })
    }

});

router.get("/login", (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) next(err);
        if (!user) res.status(404).json(info);
        req.logIn(user, function (err) {
            if (err) next(err);
            return res.json(user);
        });
    })(req, res, next);
});

router.get("/user", auth, async (req, res) => {
    try {
        const userdId = req.session.passport.user;
        const user = await db.User.findOne({ where: { id: userdId } })
        const { id, email } = user;
        res.json({ id, email });
    } catch (err) {
        if (err) console.log(err)
    }
})

router.get("/logout", (req, res) => {
    req.logout();
    res.redirect('/user/login');
});

module.exports = router;