require('dotenv').config()

// Packages
const express = require('express')
const axios = require('axios')
const puppeteer = require('puppeteer')
const cors = require('cors')
const ejs = require('ejs')
const mongoose = require('mongoose')
const { wakeDynos } = require('heroku-keep-awake')

// Models
const Fft = require('./models/Fft')

const sendTicket = require('./nodemailer/templates/sendTicket')

const app = express()
const port = process.env.PORT || 5000

const db = process.env.MONGODB_URI

const mongooseOptions = {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true
}

app.use(cors())
app.options('*', cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.set('view engine', 'ejs')

app.get('/awake', (req, res) => {
  res.status(200).json('Successfully awaked!')
})

app.post('/create-pdf', async (req, res) => {
  try {
    const { flight, passengers, email } = req.body
    const airlines = await axios.get('https://api.skypicker.com/airlines')

    const html = await ejs.renderFile('./views/expedia.ejs', {
      flight,
      passengers,
      airlines: airlines.data,
      month: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
      itinerary: '#7361512585502',
      getTotal: function getTotal(flight, passengers) {
        const { adults, kids } = passengers
        const price = flight.price * adults.length + 0.75 * flight.price * kids.length

        return price
      },
      timeDifference: function timeDifference(date1, date2) {
        var difference = date1 * 1000 - date2 * 1000

        var daysDifference = Math.floor(difference / 1000 / 60 / 60 / 24)
        difference -= daysDifference * 1000 * 60 * 60 * 24

        var hoursDifference = Math.floor(difference / 1000 / 60 / 60)
        difference -= hoursDifference * 1000 * 60 * 60

        var minutesDifference = Math.floor(difference / 1000 / 60)
        difference -= minutesDifference * 1000 * 60

        return hoursDifference + 'h ' + minutesDifference + 'm'
      },
      getAirline: function getAirline(airlines, id) {
        return airlines.filter(airline => airline.id === id).map(airline => airline.name)
      },
      getAdultTotal: function getAdultTotal(flight) {
        return flight.price
      },
      getAdultFlight: function getAdultFlight(flight) {
        const price = flight.price * 0.925
        const decimals = 2
        return Number(Math.round(price + 'e' + decimals) + 'e-' + decimals)
      },
      getAdultFees: function getAdultFees(flight) {
        const price = flight.price * 0.075
        const decimals = 2
        return Number(Math.round(price + 'e' + decimals) + 'e-' + decimals)
      },
      getChildTotal: function getChildTotal(flight) {
        const price = 0.75 * flight.price
        const decimals = 2
        return Number(Math.round(price + 'e' + decimals) + 'e-' + decimals)
      },
      getChildFlight: function getChildFlight(flight) {
        const price = 0.75 * flight.price * 0.925
        const decimals = 2
        return Number(Math.round(price + 'e' + decimals) + 'e-' + decimals)
      },
      getChildFees: function getChildFees(flight) {
        const price = 0.75 * flight.price * 0.075
        const decimals = 2
        return Number(Math.round(price + 'e' + decimals) + 'e-' + decimals)
      }
    })

    const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] })
    const page = await browser.newPage()
    page.emulateMediaType('screen')
    page.setContent(html)
    const pdf = await page.pdf({ format: 'A4', margin: '450px' })
    await res.writeHead(200, { 'Content-Type': 'application/pdf' })
    await browser.close()

    sendTicket(pdf, email)
    await Fft.create({ flight, passengers, email })
    res.end(pdf)
  } catch (error) {
    if (error) throw error
  }
})

mongoose.connect(db, mongooseOptions, () => console.log('MongoDB Connected')) // eslint-disable-line no-console

app.listen(port, error => {
  console.log(error ? error : `Server Ready on ${port}`) // eslint-disable-line no-console
  wakeDynos([
    'https://fake-flight-tickets-api.herokuapp.com',
    'https://fake-flight-tickets-app.herokuapp.com'
  ])
})
