const router = require("express").Router();
module.exports = router;
router.use("/user", require('./user'))
router.use("/users", require('./users'))
router.use("/auth", require('./auth'))
router.use("/property", require('./property.js'))