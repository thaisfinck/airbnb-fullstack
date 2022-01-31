const mongoose = require('mongoose')

// Create the users moodel
module.exports = mongoose.model('users', {
  avatar: {
    type: String
  },
  email: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
})
