import axios from 'axios'

import formatDateForApi from '../utils/formatDateForApi'

const baseApi = `https://api.skypicker.com`

export function getLocations(locationCode) {
  return axios.get(
    baseApi +
      '/locations' +
      '?limit=20' +
      `&term=${locationCode}` +
      '&locale=en-US' +
      '&X-Client=frontend' +
      '&location_types=city' +
      '&location_types=airport' +
      '&location_types=country'
  )
}

export function getFlights(from, to, when) {
  return axios.get(
    baseApi +
      '/flights' +
      `?flyFrom=${from}` +
      `&to=${to}` +
      '&partner=skypicker' +
      '&limit=200' +
      '&sort=duration' +
      `&dateFrom=${formatDateForApi(when)}` +
      `&dateTo=${formatDateForApi(when)}` +
      '&dtimefrom=00%3A01' +
      '&dtimeto=23%3A55' +
      '&passengers=1' +
      '&curr=USD' +
      '&selectedAirlines=IX%2CQZ%2CAK%2CD7' +
      '&selectedAirlinesExclude=true'
  )
}

export function createTicketPdf(flight, passengers, email) {
  return axios.post(
    `${process.env.API_URL}/create-pdf`,
    { flight, passengers, email },
    { responseType: 'blob' }
  )
}
