const express = require('express')
const Record = require('../../models/record')
const router = express.Router()

// Create - lead to create page
router.get('/new', (req, res) => {
  return Record.find()
    .lean()
    .then(() => res.render('new'))
    .catch(err => console.log(err))
})

// Create - lead to index page
router.post('/', (req, res) => {
  const { name, category, date, amount } = req.body
  console.log(`name: ${name}, category: ${category}, amount: ${amount}`)
  return Record.create({ name, category, date, amount })
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

router.get('/edit', (req, res) => {
  return Record.find()
    .lean()
    .then(expenses => res.render('edit', { expenses }))
    .catch(err => console.log(err))
})

module.exports = router