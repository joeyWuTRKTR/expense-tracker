const express = require('express')
const passport = require('passport')
const router = express.Router()
const User = require('../../models/user')

router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  const errors = []

  if ( !name || !email || !password || !confirmPassword ) {
    errors.push({ message: '請填入所有欄位!' })
  }

  if ( password !== confirmPassword ) {
    errors.push({ message: '密碼和驗證密碼不正確!'})
  }

  if (errors.length) {
    return res.render('register', { errors, name, email, password, confirmPassword })
  } else {
    User.create({ name, email, password })
      .then(() => res.redirect('/users/login'))
      .catch(err => console.log(err))
  }
})

router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', '成功登出!')
  res.redirect('/users/login')
})

module.exports = router