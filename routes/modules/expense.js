const express = require('express')
const Expense = require('../../models/record')
const router = express.Router()

router.get('/new', (req, res) => {
  return Expense.find()
    .lean()
    .then(expenses => res.render('new', { expenses }))
    .catch(err => console.log(err))
})

router.get('/edit', (req, res) => {
  return Expense.find()
    .lean()
    .then(expenses => res.render('edit', { expenses }))
    .catch(err => console.log(err))
})

module.exports = router