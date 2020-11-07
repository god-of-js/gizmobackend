const router = require("express").Router();
const user = require('../controllers/user')
const {isAuthenticated} = require('../middleware')
const make = require('../services/make')
router.post('/register',  make(user.register))
router.delete('/delete-account/:id', isAuthenticated, make(user.deleteAccount))
router.patch('/update-avatar', isAuthenticated, make(user.updateAvatar))
module.exports = router;