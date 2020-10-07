const router = require("express").Router();
const sellProperty = require('../controllers/seller/property.js')
const upload = require('multer')()
const { isAuthenticated } = require('../middleware')
const make = require('../services/make')
router.post('/add-property',
upload.array("media"),
isAuthenticated,
make(sellProperty.addProperty))
module.exports = router