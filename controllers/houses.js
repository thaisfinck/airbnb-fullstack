// Import Packages
const express = require('express')
const router = express.Router()
const moment = require('moment')

//Models
const Houses = require('../models/houses')

router.get('/', async (req, res, next) => {
  try {
    console.log('query', req.query)

    let search = {}

    if (req.query.location && req.query.location != '') {
      console.log(req.query.location)
      search.location = req.query.location
    }

    if (req.query.rooms && req.query.rooms != '') {
      search.rooms = req.query.rooms
    }

    if (req.query.price && req.query.price != '') {
      search.price = { $lt: req.query.price }
    }

    // if (req.query.sort != '') {
    //   search.sort = req.query.sort
    // }

    let sort = req.query.sort

    if (req.query.search && req.query.search != '') {
      search.title = {
        $regex: `${req.query.search}`,
        $options: 'i'
      }
    }

    console.log(search)
    console.log(sort)

    let houses = await Houses.find(search).sort(sort)

    //console.log({ houses })

    res.render('houses/list', { user: req.user, houses })
  } catch (err) {
    next(err)
  }
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
    //console.log('HOUSE', house)

    //let newDate = moemnt(booking.date).format('DD MMM')
    //console.log
    res.render('houses/one', { user: req.user, house })
  } catch (err) {
    next(err)
  }
})

router.get('/:id/edit', async (req, res, next) => {
  try {
    if (!req.isAuthenticated()) {
      res.render('/auth/login')
    } else {
      let editedHouse = await Houses.findById(req.params.id).populate('host')
      //console.log('EDITED HOUSE', editedHouse)
      res.render('houses/edit', { user: req.user, editedHouse })
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

router.patch('/:id', async (req, res, next) => {
  try {
    if (!req.isAuthenticated()) {
      res.render('/auth/login')
    } else {
      let updatedHouse = await Houses.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      )
      console.log({ updatedHouse })
      res.redirect(`/houses/${updatedHouse._id}`)
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
    //House.findByIdAndDelete(req.params.id)
    //res.redirect to the profile
  } catch (err) {
    next(err)
  }
})

module.exports = router
