const express = require('express')
const router = express.Router()
const home = require('./modules/home')
const expense = require('./modules/expenses')
const user = require('./modules/users')
const { authenticator } = require('../middleware/auth')

router.use('/expenses', authenticator, expense)
router.use('/users', user)
router.use('/', authenticator, home)

module.exports = router