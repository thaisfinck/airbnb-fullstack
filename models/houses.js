const mongoose = require('mongoose')

// Create the houses moodel
module.exports = mongoose.model('houses', {
  description: {
    type: String
  },
  Host: {
    type: ObjectId,
    ref: 'users',
    Required: true
  },

  location: {
    type: String,
    required: true
  },
  photos: [
    {
      type: String,
      required: true
    }
  ],
  price: {
    type: Number,
    required: true
  },
  rooms: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  }
})
