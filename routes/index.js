const express = require('express')
const router = express.Router()
const home = require('./modules/home')
const expense = require('./modules/expense')
const user = require('./modules/user')

router.use('/', home)
router.use('/expense', expense)
router.use('/user', user)

module.exports = router