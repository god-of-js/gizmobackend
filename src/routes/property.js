const router = require("express").Router();
const property = require('../controllers/seller/property.js')
const { isAuthenticated } = require('../middleware')
const make = require('../services/make')
router.post('/add-property',
    isAuthenticated,
    make(property.addProperty))
router.get('/fetch-properties',
    isAuthenticated,
    make(property.getProperties))
module.exports = router