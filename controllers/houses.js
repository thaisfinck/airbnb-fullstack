// Import Packages
const express = require('express')
const router = express.Router()

//Models
const Houses = require('../models/houses')

router.get('/', async (req, res) => {
  let houses = await Houses.find({})
  console.log(houses)
  //  let houses = await House.find(req.query)
  //.sort('price') and sort('-price') --> req.body.sort
  //console.log(req.query)
  //delete objects and just let place and n of rooms (if the key is what I dont want to appear then delete, I can do a for in as well with the deletes )
  //let sort last, the search box is the same as the google
  //res.render('houses/list', { user: req.user, findHouse })
  res.render('houses/list', { user: req.user, houses })
})

router.get('/create', (req, res, next) => {
  try {
    if (!req.isAuthenticated()) {
      res.render('/auth/login')
    } else {
      res.render('houses/create', { user: req.user })
    }
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    let house = await Houses.findById(req.params.id).populate('host')
    console.log(house)
    res.render('houses/one', { user: req.user, house })
  } catch (err) {
    next(err)
  }
})

router.get('/:id/edit', (req, res, next) => {
  try {
    if (!req.isAuthenticated()) {
      res.render('/auth/login')
    } else {
      res.render('houses/edit', { user: req.user })
    }
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    if (!req.isAuthenticated()) {
      res.render('/auth/login')
    } else {
      req.body.host = req.user._id
      //console.log(req.body)
      let house = await Houses.create(req.body)
      //console.log(house)
      res.redirect(`/houses/${house._id}`)
    }
  } catch (err) {
    next(err)
  }
})

router.patch('/:id', (req, res, next) => {
  try {
    if (!req.isAuthenticated()) {
      res.render('/auth/login')
    } else {
      res.render('/:id', { user: req.user })
    }
  } catch (err) {
    next(err)
  }
})

router.delete('/:id', (req, res, next) => {
  try {
    if (!req.isAuthenticated()) {
      res.render('/auth/login')
    } else {
      res.render('/:id', { user: req.user })
    }
  } catch (err) {
    next(err)
  }
})

module.exports = router
