const router = require("express").Router();
const users = require('../controllers/users')
// const {isAuthenticated} = require('../middleware')
const make = require('../services/make')
router.get('/get-user/:id', make(users.getUser))
module.exports = router