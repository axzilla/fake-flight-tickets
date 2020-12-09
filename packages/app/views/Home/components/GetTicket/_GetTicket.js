import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

// import mockdata from './mockdata.json'

import GetTicketFeedItem from './_GetTicketFeedItem'
import GetTicketPassengerDialog from './_GetTicketPassengerDialog'
import { Section, SectionHeadlines } from '../../../../common'

import getCurrentDate from '../../../../utils/getCurrentDate'
import debounce from '../../../../utils/debounce'

import { getLocations, getFlights } from '../../../../services'

import { makeStyles } from '@material-ui/core/styles'
import Autocomplete from '@material-ui/lab/Autocomplete'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles(theme => ({ inputContainer: { marginBottom: theme.spacing(1) } }))

const GetTicket = () => {
  const classes = useStyles()

  const [isLoading, setIsLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const [expanded, setExpanded] = React.useState(false)
  const [nothingFound, setNothingFound] = useState(false)
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [flightDataFrom, setFlightDataFrom] = useState({})
  const [flightDataTo, setFlightDataTo] = useState({})
  const [flights, setFlights] = useState([])
  // const [flights, setFlights] = useState(mockdata.data)
  const [adults, setAdults] = useState([''])
  const [kids, setKids] = useState([])
  const [formData, setFormData] = useState({
    from: '',
    to: '',
    when: getCurrentDate()
  })

  const debouncedFrom = debounce(formData.from, 300)
  const debouncedTo = debounce(formData.to, 300)

  useEffect(() => {
    if (debouncedFrom) {
      getLocations(formData.from)
        .then(res => setFlightDataFrom(res.data))
        .catch(error => console.log(error)) // eslint-disable-line no-console
    }
  }, [debouncedFrom])

  useEffect(() => {
    if (debouncedTo) {
      getLocations(formData.to)
        .then(res => setFlightDataTo(res.data))
        .catch(error => console.log(error)) // eslint-disable-line no-console
    }
  }, [debouncedTo])

  function handleInputChange(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    })
  }

  function handleAdultInputChange(event, index) {
    setAdults([...adults.slice(0, index), event.target.value, ...adults.slice(index + 1)])
  }

  function handleKidsInputChange(event, index) {
    setKids([...kids.slice(0, index), event.target.value, ...kids.slice(index + 1)])
  }

  async function handleFlightSearch() {
    try {
      setNothingFound(false)
      setFlights([])
      setIsLoading(true)

      const flights = await getFlights(from, to, formData.when)

      if (!flights.data.data.length) {
        setNothingFound(true)
      }

      setFlights(flights.data.data)
      setIsLoading(false)
    } catch (error) {
      if (error) throw error
    }
  }

  const handleClickOpen = () => {
    setOpen(true)
  }

  function getDisabledState() {
    return (
      !formData.from ||
      !formData.to ||
      !formData.when ||
      isLoading ||
      adults.some(adult => {
        return !adult.length > 0
      }) ||
      kids.some(adult => {
        return !adult.length > 0
      })
    )
  }

  return (
    <Section light>
      <SectionHeadlines
        headline="GET YOUR TICKET"
        subHeadline="Get your onward or return flight ticket instantly without any delay"
      />
      <Grid container justify="center" spacing={2} className={classes.inputContainer}>
        <Grid item xs={12} md={4}>
          <Autocomplete
            options={flightDataFrom.locations}
            getOptionLabel={option => {
              setFrom(option.code)
              return `${option.code} - ${option.name}`
            }}
            renderInput={params => (
              <TextField
                name="from"
                onChange={handleInputChange}
                value={formData.from}
                {...params}
                label="From"
                placeholder="Start typing..."
                variant="outlined"
                fullWidth
              />
            )}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <Autocomplete
            options={flightDataTo.locations}
            getOptionLabel={option => {
              setTo(option.code)
              return `${option.code} - ${option.name}`
            }}
            renderInput={params => (
              <TextField
                name="to"
                onChange={handleInputChange}
                value={formData.to}
                {...params}
                label="To"
                placeholder="Start typing..."
                variant="outlined"
                fullWidth
              />
            )}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            name="when"
            fullWidth
            label="When"
            type="date"
            value={formData.when}
            onChange={handleInputChange}
            variant="outlined"
          />
        </Grid>
        {adults.map((_, index) => {
          return (
            <Grid key={index} item xs={12}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Full name"
                label={`Adult ${index + 1}`}
                onChange={() => handleAdultInputChange(event, index)}
              />
            </Grid>
          )
        })}
        {kids.map((_, index) => {
          return (
            <Grid key={index} item xs={12}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Full name"
                label={`Child ${index + 1}`}
                onChange={() => handleKidsInputChange(event, index)}
              />
            </Grid>
          )
        })}
        <Grid container justify="flex-end">
          <Button onClick={handleClickOpen} variant="text" color="primary">
            Passenger
          </Button>
        </Grid>
      </Grid>
      <Button
        onClick={handleFlightSearch}
        disabled={getDisabledState()}
        fullWidth
        variant="contained"
        color="primary"
      >
        Search Flights
      </Button>
      <br />
      <br />
      <Grid container justify="center">
        {isLoading && <CircularProgress />}
      </Grid>
      <Grid container>
        <Typography gutterBottom variant="subtitle1">
          {!isLoading && nothingFound
            ? 'Nothing found... try again!'
            : !isLoading && `Found Flights (${flights.length})`}
        </Typography>
      </Grid>
      {flights &&
        flights.map(flight => {
          return (
            <GetTicketFeedItem
              key={flight.id}
              flight={flight}
              adults={adults}
              kids={kids}
              expanded={expanded}
              setExpanded={setExpanded}
            />
          )
        })}
      <GetTicketPassengerDialog
        open={open}
        setOpen={setOpen}
        adults={adults}
        setAdults={setAdults}
        kids={kids}
        setKids={setKids}
      />
    </Section>
  )
}

GetTicket.propTypes = {
  nothingFound: PropTypes.bool,
  flights: PropTypes.array,
  expanded: PropTypes.any,
  setExpanded: PropTypes.func,
  flightDataTo: PropTypes.object,
  flightDataFrom: PropTypes.object,
  formData: PropTypes.object,
  kids: PropTypes.array,
  adults: PropTypes.array,
  isLoading: PropTypes.bool,
  setFrom: PropTypes.func,
  setTo: PropTypes.func,
  handleInputChange: PropTypes.func,
  handleFlightSearch: PropTypes.func,
  setOpen: PropTypes.func,
  handleAdultInputChange: PropTypes.func,
  handleKidsInputChange: PropTypes.func
}

export default GetTicket
