const express = require('express')
const Record = require('../../models/record')
const Category = require('../../models/category')
const { dateToString } = require('../../public/javascripts/tools')
const router = express.Router()

// Create - lead to create page
router.get('/new', async (req, res) => {
  try {
    const categories = await Category.find().lean()
    await Record.find().lean()
    return res.render('new', { categories })
  } 
  catch (err) {
    console.log(err)
  }
})

// Create - lead to index page
router.post('/', async (req, res) => {
  try {
    const userId = req.user._id
    const { name, category, date, amount, merchant } = req.body
    await Record.create({ userId, name, category, date, amount, merchant })
    req.flash('success_messages', '已成功建立支出紀錄！')
    return res.redirect('/')
  } 
  catch (err) {
    console.log(err)
  }
})

// Edit - lead to edit page
router.get('/:id/edit', async (req, res) => {
  try {
    const userId = req.user._id
    const _id = req.params.id
    const categories = await Category.find().lean()
    const record = await Record.findOne({ _id, userId }).lean()
    const currentDate = dateToString(record.date)
    return res.render('edit', { record, categories, currentDate })
  } 
  catch (err) {
    console.log(err)
  }
})

// Edit - return changed value to index page
router.put('/:id', async (req, res) => {
  try {
    const userId = req.user._id
    const _id = req.params.id
    let record = await Record.findOne({ _id, userId })
    record = Object.assign(record, req.body)
    record.save()
    return res.redirect('/')
  } 
  catch (err) {
    console.log(err)
  }
})

// Delete
router.delete('/:id', async (req, res) => {
  try {
    const userId = req.user._id
    const _id = req.params.id
    const record = await Record.findOne({ _id, userId })
    record.remove()
    return res.redirect('/')
  }
  catch (err) {
    console.log(err)
  }
})

module.exports = router