const mongoose = require('mongoose')

// Create the bookings moodel
module.exports = mongoose.model('bookings', {
  author: {
    type: ObjectId,
    ref: 'users'
  },
  date: {
    type: Date,
    default: Date.now
  },
  description: {
    type: String
  },
  house: {
    type: ObjectId,
    ref: 'house'
  }
})
