const express = require('express')
const Record = require('../../models/record')
const Category = require('../../models/category')
const router = express.Router()

// 使用async/await function非同步處理category和record兩個種子資料
router.get('/', async(req, res) => {
  const categories = await Category.find().lean()
  // 把分類和icon額外拉到物件裡
  const categoryData = {}
  categories.forEach(category => categoryData[category.categoryName] = category.categoryIcon)

  return Record.find({ isDelete: false })
    .lean()
    .then(records => {
      let totalAmount = 0
      records.map(record => {
        totalAmount += record.amount
        // 將category物件的值，傳入record中
        record.categoryIcon = categoryData[record.category]
      })
      res.render('index', { records, totalAmount, categories })
    })
    .catch(err => console.log(err))
})

// 依照分類渲染index頁面
router.get('/filter', async (req, res) => {
  const categoryName = req.query.category // 找到回傳的分類
  const category = await Category.findOne({ categoryName }) // 在資料庫找到該分類的所有資料
  const categories = await Category.find().lean()

  console.log(category)
  
  return Record.find({ category: category.categoryName }).lean()
    .then(records => {
      let totalAmount = 0
      records.map(record => {
        totalAmount += record.amount
        record.categoryIcon = category.categoryIcon
      })
      res.render('index', { records, totalAmount, categories,
        currentCategory: category.categoryName })
    })
    // .then(res.redirect('/'))
    .catch()
  
})

module.exports = router