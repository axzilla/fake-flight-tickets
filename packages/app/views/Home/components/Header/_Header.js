import React from 'react'

import { Link } from '../../../../common'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles(theme => ({
  root: {
    zIndex: 1,
    padding: theme.spacing(5, 0),
    marginBottom: theme.spacing(5),
    textAlign: 'center',
    maxWidth: 600
  }
}))

const Header = () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Typography gutterBottom component="h1" variant="h3">
        <strong>Fake Flight Ticket Generator</strong>
      </Typography>
      <Typography gutterBottom color="textSecondary" component="h2" variant="body1">
        &apos;Real fake&apos; onward or return flight tickets. Real flight data. Looks 100% like a
        real flight ticket. For digital nomads, perpetual traveler, travel hackers and more...
      </Typography>
      <br />
      <Typography gutterBottom variant="subtitle1">
        Read
        <strong>
          <Link href="#faq"> FAQ </Link>
        </strong>
        before using it!
      </Typography>
      <br />
      <Link href="#book-flight">
        <Button color="primary" variant="contained">
          GET TICKET $0 *
        </Button>
      </Link>
      <br />
      <br />
      <Typography color="textSecondary">* Currently for free because we are in beta</Typography>
    </div>
  )
}

export default Header
