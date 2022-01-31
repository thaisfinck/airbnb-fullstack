// Import Packages
const express = require('express')
const router = express.Router()

router.get('/login', (req, res) => {
  res.render('login')
})

router.get('/signup', (req, res) => {
  res.render('signup')
})

router.post('/login', (req, res) => {})

router.post('/signup', (req, res) => {})

router.get('/logout', (req, res) => {})

module.exports = router
