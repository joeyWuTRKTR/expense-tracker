const express = require('express')
const exphbs = require('express-handlebars')
const app = express()

// 設定handlebars樣板引擎
app.engine('hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs'
}))
app.set('view engine', 'hbs')


// middleware
app.use(express.urlencoded({ extended: true }))


// 監聽網站
app.listen(3000, () => console.log('Web app is connected on port 3000'))