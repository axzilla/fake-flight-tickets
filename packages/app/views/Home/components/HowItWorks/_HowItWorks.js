import React from 'react'

import { Section, SectionHeadlines } from '../../../../common'

import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import LocalAtmIcon from '@material-ui/icons/LocalAtm'
import FlightIcon from '@material-ui/icons/Flight'
import ConfirmationNumberIcon from '@material-ui/icons/ConfirmationNumber'

function HowItWorks() {
  return (
    <Section>
      <SectionHeadlines
        headline="HOW IT WORKS"
        subHeadline="Everything is done in 3 little steps"
      />
      <Grid container spacing={5}>
        <Grid item xs={12} md={4}>
          <Box align="center">
            <FlightIcon fontSize="large" />
            <Typography gutterBottom variant="h5">
              1. Find a flight
            </Typography>
            <Typography color="textSecondary" gutterBottom>
              Choose a department and arrival airport and select a date. Enter passenger/s name/s.
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box align="center">
            <LocalAtmIcon fontSize="large" />
            <Typography gutterBottom variant="h5">
              2. Make a payment *
            </Typography>
            <Typography gutterBottom color="textSecondary">
              {/* Currently just $1 each Passenger. Select between credit card and PayPal as well. */}
              * Currently for free because we are in beta.
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box align="center">
            <ConfirmationNumberIcon fontSize="large" />
            <Typography gutterBottom variant="h5">
              3. Get your ticket
            </Typography>
            <Typography gutterBottom color="textSecondary">
              You can see a preview of your ticket directly. After payment you will also receive
              your PDF-ticket as an e-mail.
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Section>
  )
}

export default HowItWorks
