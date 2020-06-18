const mongoose = require('mongoose')

const Schema = mongoose.Schema

const DeviceSchema = Schema({
  brand: {
    type: String
  },
  model: {
    type: String
  }
})

module.exports = Device = mongoose.model('device', DeviceSchema)