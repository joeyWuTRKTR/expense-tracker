const express = require('express')
const exphbs = require('express-handlebars')
const hbshelpers = require('handlebars-helpers')
const session = require('express-session')
const flash = require('connect-flash')
const routes = require('./routes')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const PORT = process.env.PORT
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
app.use(express.static('public'))

// session
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))

const usePassport = require('./config/passport')
usePassport(app)

// flash
app.use(flash())

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  next()
})


app.use(routes)

// 監聽網站
app.listen(PORT, () => console.log(`Web app is connected on http://localhost:${PORT}`))