import React, { useState } from 'react'
import Proptypes from 'prop-types'
import domains from 'disposable-email-domains'

import getTime from '../../../../utils/getTime'
import { createTicketPdf } from '../../../../services'

import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import LinearProgress from '@material-ui/core/LinearProgress'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'

import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt'

const useStyles = makeStyles(theme => ({
  time: { marginBottom: theme.spacing(-0.5) },
  imgAirline: { marginRight: theme.spacing(2), width: '32px', height: '32px' },
  priceOrigin: { marginRight: theme.spacing(1), textDecoration: 'line-through' },
  passengerButton: { padding: theme.spacing(0.5), minWidth: 0 },
  expansionPanelDetails: { flexDirection: 'column' }
}))

const GetTicketFeedItem = ({ flight, expanded, setExpanded, adults, kids }) => {
  const classes = useStyles()
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState('')

  function calcTotalOrigin() {
    const priceAdults = flight.price * adults.length
    const priceKids = flight.price * kids.length * 0.75
    return priceAdults + priceKids
  }

  function calcTotalApp() {
    const price = 0
    const priceAdults = price * adults.length
    const priceKids = price * kids.length
    return priceAdults + priceKids
  }

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false)
  }

  function handleTicketCreation(event) {
    event.preventDefault()
    if (domains.includes(email.split('@')[1])) {
      alert('This email address is not allowed')
      setEmail('')
      return
    }

    setIsLoading(true)

    const passengers = { kids, adults }

    createTicketPdf(flight, passengers, email)
      .then(response => {
        const file = new Blob([response.data], { type: 'application/pdf' })
        const fileURL = URL.createObjectURL(file)
        window.open(fileURL)

        setIsLoading(false)
      })
      .catch(error => console.log(error)) // eslint-disable-line no-console
  }

  function GetTicketFeedItemAirlineImage() {
    return (
      <img
        className={classes.imgAirline}
        src={
          flight.airlines.length > 1
            ? '/multi.png'
            : `https://images.kiwi.com/airlines/32/${flight.airlines[0]}.png`
        }
      />
    )
  }

  function GetTicketFeedItemFromTo() {
    return (
      <Grid item>
        <Grid container>
          <div>
            <Typography className={classes.time}>{getTime(flight.dTimeUTC)}</Typography>
            <Typography variant="caption">{flight.flyFrom}</Typography>
          </div>
          <ArrowRightAltIcon />
          <div>
            <Typography className={classes.time}>{getTime(flight.aTimeUTC)}</Typography>
            <Typography variant="caption">{flight.flyTo}</Typography>
          </div>
        </Grid>
        <Grid container>
          <Typography variant="caption">
            {flight.route.length > 1 ? `${flight.route.length - 1} stops` : 'Non-stop'}
          </Typography>
          &nbsp;&bull;&nbsp; <Typography variant="caption">{flight.fly_duration}</Typography>
        </Grid>
      </Grid>
    )
  }

  function GetTicketFeedItemPrice() {
    return (
      <Grid container>
        <Typography variant="subtitle1" className={classes.priceOrigin}>
          <Box fontWeight="bold"> ${flight.price}</Box>
        </Typography>
        <Typography variant="subtitle1" color="primary">
          <Box fontWeight="bold">$0</Box>
        </Typography>
      </Grid>
    )
  }

  return (
    <ExpansionPanel expanded={expanded === flight.id} onChange={handleChange(flight.id)}>
      <ExpansionPanelSummary>
        <Grid container justify="space-between">
          <Grid item>
            <Grid container>
              <GetTicketFeedItemAirlineImage />
              <GetTicketFeedItemFromTo />
            </Grid>
          </Grid>
          <Grid item>
            <GetTicketFeedItemPrice />
          </Grid>
        </Grid>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails classes={{ root: classes.expansionPanelDetails }}>
        <Grid container justify="flex-end">
          <Typography variant="subtitle1" className={classes.priceOrigin}>
            <Box fontWeight="bold">${calcTotalOrigin()}</Box>
          </Typography>
          <Typography variant="subtitle1" color="primary">
            <Box fontWeight="bold"> ${calcTotalApp()}</Box>
          </Typography>
          <Typography variant="subtitle1">
            &nbsp;({adults.length} adults, {kids.length} children){' '}
          </Typography>
        </Grid>
        <form onSubmit={handleTicketCreation}>
          <Button variant="outlined" color="primary" disabled={isLoading} type="submit">
            GET TICKET $0
          </Button>
        </form>
      </ExpansionPanelDetails>
      {isLoading && <LinearProgress />}
    </ExpansionPanel>
  )
}

GetTicketFeedItem.propTypes = {
  flight: Proptypes.object,
  adults: Proptypes.array,
  kids: Proptypes.array,
  expanded: Proptypes.any,
  setExpanded: Proptypes.func
}

export default GetTicketFeedItem
