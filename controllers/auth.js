// Import Packages
const express = require('express')
const router = express.Router()
const Users = require('../models/users')

router.get('/login', (req, res) => {
  res.render('login')
})

router.get('/signup', (req, res) => {
  res.render('signup')
})

router.post('/login', (req, res) => {})

router.post('/signup', async (req, res, next) => {
  try {
    let existingUser = await Users.findOne({ email: req.body.email })
    if (existingUser) {
      throw new Error('User already exist!')
    } else {
      let user = await Users.create(req.body)
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

router.get('/logout', (req, res) => {})

module.exports = router
