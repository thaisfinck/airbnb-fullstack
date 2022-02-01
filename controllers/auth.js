// Import Packages
const express = require('express')
const router = express.Router()

//Models
const Users = require('../models/users')

router.get('/login', (req, res) => {
  res.render('login')
})

//Routes
router.get('/signup', (req, res) => {
  res.render('signup')
})

router.post('/login', async (req, res, next) => {
  try {
    let loginUser = await Users.findOne({
      email: req.body.email,
      password: req.body.password
    })
    //console.log(loginUser)
    if (loginUser) {
      res.redirect('/')
    } else {
      throw new Error('Whrong email or password!')
    }
  } catch (err) {
    next(err)
  }
})
// 	req.login findOne email, password)
// If true - redirect, if false email or password whrong

router.post('/signup', async (req, res, next) => {
  try {
    //console.log(req.body)
    let existingUser = await Users.findOne({ email: req.body.email })
    if (existingUser) {
      throw new Error('User already exist!')
    } else {
      let user = await Users.create(req.body)
      //console.log({user}) - Saving as an object to make it easier to see on the console
      req.login(user, err => {
        if (err) {
          throw err
        } else {
          res.redirect('/')
        }
      })
    }
  } catch (err) {
    next(err)
  }
})

router.get('/logout', (req, res, next) => {
  try {
    req.logout()
    req.session.destroy(err => {
      if (err) {
        next(err)
      }
      res.clearCookie('connect.sid')
      res.redirect('/auth/login')
    })
  } catch (err) {
    next(err)
  }
})

module.exports = router
