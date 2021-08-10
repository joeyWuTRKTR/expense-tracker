const express = require('express')
const Record = require('../../models/record')
const Category = require('../../models/category')
const { dateToString } = require('../../public/javascripts/tools')
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
  const userId = req.user._id
  const { name, category, date, amount } = req.body
  return Record.create({ userId, name, category, date, amount })
    .then(() => {
      req.flash('success_messages', '已成功建立支出紀錄！')
      res.redirect('/')
    })
    .catch(err => console.log(err))
})

// Edit - lead to edit page
router.get('/:id/edit', async (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  const categories = await Category.find().lean()
  return Record.findOne({ _id, userId })
    .lean()
    .then(record => {
      const currentDate = dateToString(record.date)
      return res.render('edit', { record, categories, currentDate }) 
    })
    .catch(err => console.log(err))
})

// Edit - return changed value to index page
router.put('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Record.findOne({ _id, userId })
    .then(record => {
      record = Object.assign(record, req.body)
      return record.save()
    })
    .then(res.redirect('/'))
    .catch(err => console.log(err))
})

// Delete
router.delete('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Record.findOne({ _id, userId })
    .then(record => record.remove())
    .then(res.redirect('/'))
    .catch(err => console.log(err))
})

module.exports = router