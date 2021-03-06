const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

// Create the houses moodel
module.exports = mongoose.model('houses', {
  description: {
    type: String
  },
  host: {
    type: ObjectId,
    ref: 'users',
    required: true
  },

  location: {
    type: String
  },
  photos: [
    {
      type: String
    }
  ],
  price: {
    type: Number,
    required: true
  },
  rooms: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    required: true
  }
})
