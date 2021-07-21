const recordData = require('./seed.json')
const recordList = recordData.recordSeeds
const Record = require('../record')

const db = require('../../config/mongoose')

db.once('open', () => {
  recordList.forEach(record => {
    Record.create({
      name: record.name,
      merchant: record.merchant,
      category: record.category,
      date: record.date,
      amount: record.amount
    })
  })

  console.log('record seeder finished')
})