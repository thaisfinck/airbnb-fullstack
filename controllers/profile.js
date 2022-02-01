// Import Packages
const express = require('express')
const router = express.Router()

router.get('/', (req, res, next) => {
  try {
    if (!req.isAuthenticated()) {
      res.render('/auth/login')
    } else {
      res.render('profile', { user: req.user })
    }
  } catch (err) {
    next(err)
  }
})

router.patch('/', (req, res, next) => {
  try {
    if (!req.isAuthenticated()) {
      res.render('/auth/login')
    } else {
      res.render('profile', { user: req.user })
    }
  } catch (err) {
    next(err)
  }
})

module.exports = router
