// Import Packages
const express = require('express')
const router = express.Router()

//Models
const Houses = require('../models/houses')

router.get('/', async (req, res, next) => {
  try {
    console.log(req.query)

    let search = {}

    if (req.query.location != '') {
      search.location = req.query.location
    }

    if (req.query.rooms != '') {
      search.rooms = req.query.rooms
    }

    if (req.query.price != '') {
      search.price = { $lt: req.query.price }
    }

    // if (req.query.sort != '') {
    //   search.sort = req.query.sort
    // }

    let sort = {
      price: req.query.sort
    }

    if (req.query.search != '') {
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
