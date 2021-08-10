const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  name: { type: String },
  email: { type: String },
  password: { type: String }
  date: { tyep: Date, default: Date.now() }
})

module.exports = mongoose.models('User', userSchema)