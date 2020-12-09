require('dotenv').config()
const express = require('express')
const axios = require('axios')
const path = require('path')
const puppeteer = require('puppeteer')
const jwtDecode = require('jwt-decode')
const cors = require('cors')
// const http = require('http')

const createJwtToken = require('./utils/createJwtToken')
const sendTicket = require('./nodemailer/templates/sendTicket')

const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.options('*', cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))
app.set('view engine', 'ejs')

// setInterval(function() {
//   http.get('http://faketickets.herokuapp.com')
// }, 1500000) // every 25 minutes (1500000)

app.get('/create-html', async (req, res) => {
  try {
    const decoded = jwtDecode(req.headers.authorization)
    const { flight, passengers } = decoded

    const airlines = await axios.get('https://api.skypicker.com/airlines')
    res.render('expedia', { flight, passengers, airlines: airlines.data })
  } catch (error) {
    if (error) throw error
  }
})

app.post('/create-pdf', async (req, res) => {
  const { flight, passengers, email } = req.body
  try {
    const payload = { flight, passengers }
    const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] })
    const page = await browser.newPage()
    const token = await createJwtToken(payload)

    page.setExtraHTTPHeaders({
      authorization: token
    })

    await page.goto(`http://localhost:${port}/create-html`, {
      waitUntil: ['domcontentloaded', 'load', 'networkidle0']
    })

    const pdf = await page.pdf({ format: 'A4', margin: '450px' })
    res.writeHead(200, { 'Content-Type': 'application/pdf' })

    await browser.close()

    sendTicket(pdf, email)
    res.end(pdf)
  } catch (error) {
    if (error) throw error
  }
})

app.listen(port, error => console.log(error ? error : `Server Ready on ${port}`))

// **************************************************
// Functions & Variables
// **************************************************

// Month
app.locals.month = [
  'JAN',
  'FEB',
  'MAR',
  'APR',
  'MAY',
  'JUN',
  'JUL',
  'AUG',
  'SEP',
  'OCT',
  'NOV',
  'DEC'
]

// Itinerary
app.locals.itinerary = '#7361512585502'

// Get time difference for a flight route or layover in hours and minutes (2h 35m)
app.locals.timeDifference = function timeDifference(date1, date2) {
  var difference = date1 * 1000 - date2 * 1000

  var daysDifference = Math.floor(difference / 1000 / 60 / 60 / 24)
  difference -= daysDifference * 1000 * 60 * 60 * 24

  var hoursDifference = Math.floor(difference / 1000 / 60 / 60)
  difference -= hoursDifference * 1000 * 60 * 60

  var minutesDifference = Math.floor(difference / 1000 / 60)
  difference -= minutesDifference * 1000 * 60

  return hoursDifference + 'h ' + minutesDifference + 'm'
}

// Get airline name from airline ID (operating_carrier)
app.locals.getAirline = function getAirline(airlines, id) {
  return airlines.filter(airline => airline.id === id).map(airline => airline.name)
}

// Get total
app.locals.getTotal = function getTotal(flight, passengers) {
  const { adults, kids } = passengers
  const price = flight.price * adults.length + 0.75 * flight.price * kids.length

  return price
}

// Get adult total
app.locals.getAdultTotal = function getAdultTotal(flight) {
  return flight.price
}

// Get adult flight
app.locals.getAdultFlight = function getAdultFlight(flight) {
  const price = flight.price * 0.925
  const decimals = 2
  return Number(Math.round(price + 'e' + decimals) + 'e-' + decimals)
}

// Get adult fees
app.locals.getAdultFees = function getAdultFees(flight) {
  const price = flight.price * 0.075
  const decimals = 2
  return Number(Math.round(price + 'e' + decimals) + 'e-' + decimals)
}

// Get child total
app.locals.getChildTotal = function getChildTotal(flight) {
  const price = 0.75 * flight.price
  const decimals = 2
  return Number(Math.round(price + 'e' + decimals) + 'e-' + decimals)
}

// Get child flight
app.locals.getChildFlight = function getChildFlight(flight) {
  const price = 0.75 * flight.price * 0.925
  const decimals = 2
  return Number(Math.round(price + 'e' + decimals) + 'e-' + decimals)
}

// Get child fees
app.locals.getChildFees = function getChildFees(flight) {
  const price = 0.75 * flight.price * 0.075
  const decimals = 2
  return Number(Math.round(price + 'e' + decimals) + 'e-' + decimals)
}
