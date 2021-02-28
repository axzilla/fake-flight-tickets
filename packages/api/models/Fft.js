const mongoose = require('mongoose')
const Schema = mongoose.Schema

const FftSchema = new Schema({
  email: { type: String, required: true },
  flight: { type: Object, required: true },
  passengers: { type: Object, required: true },
  dateCreated: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Fft', FftSchema)
