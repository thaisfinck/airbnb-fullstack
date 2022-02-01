// Import Packages
const express = require('express')
const router = express.Router()

router.post('/', (req, res, next) => {
  try {
    if (!req.isAuthenticated()) {
      res.render('/auth/login')
    } else {
      res.render('/reviews', { user: req.user })
    }
  } catch (err) {
    next(err)
  }
})

module.exports = router
