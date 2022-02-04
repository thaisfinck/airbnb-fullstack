// Import Packages
const express = require('express')
const router = express.Router()
const Users = require('../models/users')
const Bookings = require('../models/bookings')
const Houses = require('../models/houses')

router.post('/', async (req, res, next) => {
  try {
    if (!req.isAuthenticated()) {
      res.render('/auth/login')
    } else {
      let author = await Users.findById(req.user._id).populate('author')
      let house = await Houses.findById(req.body.house).populate('house')
      //console.log({ author })
      let booking = await Bookings.create({
        author: author,
        description: req.body.message,
        house: house
      })
      console.log({ booking })

      //res.render('bookings/one', { booking })

      res.redirect(`/houses/${house._id}`)
    }
  } catch (err) {
    next(err)
  }
})

module.exports = router
