const express = require('express')
const Expense = require('../../models/expenses')
const router = express.Router()

router.get('/', (req, res) => {
  return Expense.find()
    .lean()
    .then(expenses => res.render('index', { expenses }))
    .catch(err => console.log(err))
})

module.exports = router