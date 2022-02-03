// Import Packages
const express = require('express')
const router = express.Router()
const Users = require('../models/users')
const Houses = require('../models/houses')

router.get('/', async (req, res, next) => {
  try {
    if (!req.isAuthenticated()) {
      res.render('/auth/login')
    } else {
      let user = await Users.findById(req.user._id)
      req.query.host = req.user._id
      let house = await Houses.find(req.query)
      //console.log('host', house)
      res.render('profile', { user: req.user, user, house })
    }
  } catch (err) {
    next(err)
  }
})

router.patch('/', async (req, res, next) => {
  try {
    if (!req.isAuthenticated()) {
      res.render('/auth/login')
    } else {
      let updatedUser = await Users.findByIdAndUpdate(req.user._id, req.body, {
        new: true
      })
      console.log({ updatedUser })
      req.login(updatedUser, err => {
        if (err) {
          throw err
        } else {
          res.redirect('/profile')
        }
      })
    }
  } catch (err) {
    next(err)
  }
})

module.exports = router
