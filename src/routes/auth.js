const router = require("express").Router();
const auth = require('../controllers/auth.js')
// const {isAuthenticated} = require('../middleware')
const make = require('../services/make')
router.post('/login', make(auth.login))
module.exports = router