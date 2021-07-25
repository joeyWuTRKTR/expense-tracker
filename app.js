const express = require('express')
const exphbs = require('express-handlebars')
const hbshelpers = require('handlebars-helpers')
const routes = require('./routes')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

const app = express()
const multihelpers = hbshelpers()

// 設定handlebars樣板引擎
app.engine('hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs',
  hbshelpers: multihelpers
}))
app.set('view engine', 'hbs')

require('./config/mongoose')

// middleware
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

app.use(routes)

// 監聽網站
app.listen(3000, () => console.log('Web app is connected on port 3000'))