import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'

const useStyles = makeStyles(theme => ({
  footer: { borderTop: '1px solid lightgrey', padding: theme.spacing(3) }
}))

function Header() {
  const classes = useStyles()

  return (
    <div className={classes.footer}>
      <Grid container justify="center">
        <Box mb={3}>
          <a
            href="https://www.producthunt.com/posts/fake-flight-tickets?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-fake-flight-tickets"
            target="_blank"
            rel="noreferrer"
          >
            <img
              src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=286315&theme=light"
              alt="Fake Flight Tickets - 'Real fake' onward or return flight tickets. | Product Hunt"
              // style={"width: 250px; height: 54px;"}
              width="250"
              height="54"
            />
          </a>
        </Box>
      </Grid>
      <Typography align="center">
        &copy; {new Date().getFullYear()} FakeFlightTickets &#10084;&#65039;
      </Typography>
    </div>
  )
}

export default Header
