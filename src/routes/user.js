const router = require("express").Router();
const user = require('../controllers/user.js')
// const {isAuthenticated} = require('../middleware')
const make = require('../services/make')
router.post('/register', make(user.register))
module.exports = router