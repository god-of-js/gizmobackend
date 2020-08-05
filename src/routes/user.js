const router = require("express").Router();
const user = require('../controllers/user.js')
// const {isAuthenticated} = require('../middleware')

router.post('/register', user.register)
module.exports = router