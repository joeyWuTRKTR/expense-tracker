const express = require('express')
const router = express.Router()
const home = require('./modules/home')
const expense = require('./modules/expenses')
const user = require('./modules/users')

router.use('/', home)
router.use('/expenses', expense)
router.use('/users', user)

module.exports = router