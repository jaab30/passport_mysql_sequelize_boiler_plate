const router = require("express").Router();
const apiRoutes = require("./apiRoutes");
const htmlRoutes = require("./htmlRoutes");
const authRoutes = require("./authRoutes");


router.get('/health', (req, res) => {
    res.json({status: 'alive'});
  });
  
//auth routes
router.use("/auth", authRoutes);

//api routes
// router.use("/api", apiRoutes);

//html routes
router.use("/", htmlRoutes);


module.exports = router