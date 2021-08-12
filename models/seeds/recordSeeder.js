if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const db = require('../../config/mongoose')
const bcrypt = require('bcryptjs')
const Record = require('../record')
const User = require('../user')

const SEED_USERS = [
  {
    name: 'root1',
    email: 'root1@example.com',
    password: 'root1',
    belongExpenses: [1, 2]
  },
  {
    name: 'root2',
    email: 'root2@example.com',
    password: 'root2',
    belongExpenses: [3, 4]
  }
]
const expenseList = [
  {
    id: 1,
    name: '午餐',
    category: '餐飲食品',
    date: '2021-06-01',
    merchant: '美爾美',
    amount: 150
  },
  {
    id: 2,
    name: '晚餐',
    category: '餐飲食品',
    date: '2021-06-02',
    merchant: '11-7',
    amount: 100
  },
  {
    id: 3,
    name: '文明帝國 VI',
    category: '休閒娛樂',
    date: '2021-06-02',
    merchant: 'ohya theater',
    amount: 1200
  },
  {
    id: 4,
    name: 'Netflix',
    category: '休閒娛樂',
    date: '2021-06-03',
    merchant: 'Marvel',
    amount: 399
  }
]

db.once('open', () => {
  Promise.all(SEED_USERS.map(SEED_USER => 
    // bcrypt 沒有運作?
    bcrypt.genSalt(10)
      .then(salt => bcrypt.hash(SEED_USER.password, salt))
      .then(hash => User.create({
        name: SEED_USER.name, 
        email: SEED_USER.email, 
        password: hash
      }))
      .then(user => {
        // 過濾出支出ID屬於哪一位使用者
        const expenses = expenseList.filter(expense => SEED_USER.belongExpenses.includes(expense.id))
        // 將支出和使用者ID關聯
        expenses.forEach(expense => { expense.userId = user._id })
        return Record.create(expenses)
      })
  ))
    .then(() => {
      console.log('done.')
      process.exit()
    })
    .catch(err => console.log(err))
})