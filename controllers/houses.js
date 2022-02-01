// Import Packages
const express = require('express')
const router = express.Router()

//Models
const Houses = require('../models/houses')

router.get('/', (req, res) => {
  //console.log(req.user)
  res.render('houses/list', { user: req.user })
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

router.get('/:id', (req, res, next) => {
  try {
    res.render('/houses', { user: req.user })
    //let house_id = req.params.id
    // let houseId = await Houses._id
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
      //console.log(req.body)
      let house = await Houses.create(req.body)
      console.log(house)
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
