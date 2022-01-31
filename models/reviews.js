const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

// Create the reviews moodel
module.exports = mongoose.model('reviews', {
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
