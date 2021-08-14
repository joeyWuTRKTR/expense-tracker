const express = require('express')
const Record = require('../../models/record')
const Category = require('../../models/category')
const { dateToString, convertDate } = require('../../public/javascripts/tools')
const router = express.Router()

// 使用async/await function非同步處理category和record兩個種子資料
router.get('/', async(req, res) => {
  try {
    const userId = req.user._id
    const categories = await Category.find().lean()
    const records = await Record.find({ userId }).lean()
    // 把分類和icon額外拉到物件裡
    const categoryData = {}
    categories.forEach(category => categoryData[category.categoryName] = category.categoryIcon)

    let totalAmount = 0
    records.forEach(record => {
      totalAmount += record.amount
      record.date = dateToString(record.date)
      // 將category物件的值，傳入record中
      record.categoryIcon = categoryData[record.category]
    })
    res.render('index', { records, totalAmount, categories })
  } 
  catch (err) {
    console.log(err)
  }
})

// 複合式搜尋
router.get('/filter', async (req, res) => {
  try {
    const userId = req.user._id
    const categoryFiltered = req.query.category
    const inputMonth = req.query.yearMonth

    // #ne 用於找出不等於的資料
    const year = Number(inputMonth.split('-')[0]) ? Number(inputMonth.split('-')[0]) : { $ne: '' }
    const month = Number(inputMonth.split('-')[1]) ? Number(inputMonth.split('-')[1]) : { $ne: '' }

    const categories = await Category.find().lean()

    // 將使用者id作為基本資料，依照選單選擇把使用者想要的資料塞入
    const filterQuery = {
      userId: userId,
      isDelete: false
    }

    if (categoryFiltered) {
      filterQuery.category = categoryFiltered
    }

    if (inputMonth) {
      filterQuery.year = year
      filterQuery.month = month
    }

    // 複合式篩選資料
    const records = await Record.aggregate([
      // 拉出需要的欄位
      { $project: { name: 1, category: 1, date: 1, amount: 1, merchant: 1, userId: 1, isDelete: 1, year: { $year: '$date' }, month: { $month: '$date' } } },
      // 篩選分類或者月份by filterQuery
      { $match: filterQuery }
    ])

    const categoryData = {}
    categories.forEach(category => categoryData[category.categoryName] = category.categoryIcon)

    // 計算總金額 & 回傳資料
    let totalAmount = 0
    records.forEach(record => {
      record.date = convertDate(record.date)
      totalAmount += record.amount
      record.categoryIcon = categoryData[record.category] // 用category資料在record裡新增fontawesome icon
    })
    return res.render('index', { records, totalAmount, categories, categoryFiltered, inputMonth })
  }
  catch (err) {
    console.log(err)
  }
})

module.exports = router