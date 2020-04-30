// this middleware is created to check if user is Authenticated before grantin access
module.exports = function (req, res, next) {
    // "isAuhenticated" is a passport method to check the user
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.redirect("/user/login")
    }

}