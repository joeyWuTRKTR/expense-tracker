const express = require('express')
const Record = require('../../models/record')
const Category = require('../../models/category')
const router = express.Router()

// Create - lead to create page
router.get('/new', async (req, res) => {
  const categories = await Category.find().lean()
  return Record.find()
    .lean()
    .then(() => res.render('new', { categories }))
    .catch(err => console.log(err))
})

// Create - lead to index page
router.post('/', (req, res) => {
  const { name, category, date, amount } = req.body
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