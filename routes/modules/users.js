const express = require('express')
const passport = require('passport')
const bcrypt = require('bcryptjs')
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

router.post('/register', async (req, res) => {
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
  }

  const user = await User.findOne({ email })
  try {
    if (user) {
      errors.push({ message: '該信箱已經註冊過!' })
      res.render('register', { errors, name, email, password, confirmPassword })
    } else {
      bcrypt
        .genSalt(10)
        .then(salt => bcrypt.hash(password, salt))
        .then(hash => User.create({
          name, email, password: hash
        }))
        .then(() => res.redirect('/'))
    }
  }
  catch (err) {
    console.log(err)
  }
})

router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', '成功登出!')
  res.redirect('/users/login')
})

module.exports = router