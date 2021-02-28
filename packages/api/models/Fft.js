const mongoose = require('mongoose')
const Schema = mongoose.Schema

const FftSchema = new Schema({
  email: { type: String, required: true },
  flight: { type: Object, required: true },
  passengers: { type: Object, required: true }
})

module.exports = mongoose.model('Fft', FftSchema)
