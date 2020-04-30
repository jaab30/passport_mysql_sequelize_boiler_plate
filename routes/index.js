const router = require("express").Router();
const apiRoutes = require("./apiRoutes");
const htmlRoutes = require("./htmlRoutes");
const authRoutes = require("./authRoutes");

//auth routes
router.use("/auth", authRoutes);

//api routes
// router.use("/api", apiRoutes);

//html routes
router.use("/", htmlRoutes);


module.exports = router