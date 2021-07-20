const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/expense-tracker', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => console.log('MongoDB connect error!'))

db.once('open', () => console.log('MongoDB Connected!'))

module.exports = db