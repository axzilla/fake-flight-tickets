import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles(theme => ({
  footer: { borderTop: '1px solid lightgrey', padding: theme.spacing(3) }
}))

function Header() {
  const classes = useStyles()

  return (
    <div className={classes.footer}>
      <Typography align="center">
        &copy; {new Date().getFullYear()} FakeFlightTickets &#10084;&#65039;
      </Typography>
    </div>
  )
}

export default Header
