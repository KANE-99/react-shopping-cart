const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ProductSchema = new Schema({

  title: {
    type: String,
    required: true,
    unique: true
  },
  device: {
    type: Schema.Types.ObjectId,
    ref: 'devices',
    // required: true
  },
  description: {
    type: String,
  },
  style: {
    type: String
  },
  price: {
    type: Number,
    required: true
  },
  currencyId: {
    type: String,
    default: "INR"
  },
  currencyFormat: {
    type: String,
    default: "₹"
  },
  isFreeShipping: {
    type: Boolean,
    default: false
  },
  productImage: {
    type: String
  }
})

module.exports = Product = mongoose.model('product', ProductSchema)