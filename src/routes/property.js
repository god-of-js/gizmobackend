const router = require("express").Router();
const property = require('../controllers/properties/property.js')
const { isAuthenticated } = require('../middleware')
const make = require('../services/make')
router.post('/add-property',
    isAuthenticated,
    make(property.addProperty))
router.get('/fetch-properties',
    isAuthenticated,
    make(property.getProperties))
router.get('/fetch-property/:id',
    isAuthenticated,
    make(property.getProperty))
router.get('/fetch-all-properties/:page',
    make(property.getAllProperties))
router.delete('/delete-property',
    make(property.deleteProperty))
module.exports = router