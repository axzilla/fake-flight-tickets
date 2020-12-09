import React from 'react'
import PropTypes from 'prop-types'

import { Link } from '../common'

import { makeStyles } from '@material-ui/core/styles'
import Hidden from '@material-ui/core/Hidden'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import FlightTakeoffIcon from '@material-ui/icons/FlightTakeoff'
import GitHubIcon from '@material-ui/icons/GitHub'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  button: { color: 'black', margin: theme.spacing(0, 0.5) },
  logo: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center'
  }
}))

function Header({ toggleDrawer, links }) {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <AppBar position="static" color="inherit">
        <Toolbar>
          <div className={classes.logo}>
            <FlightTakeoffIcon />
            &nbsp;
            <Typography variant="h6" className={classes.title}>
              <strong>Fake</strong>Flight<strong>Tickets</strong>
            </Typography>
          </div>
          <Hidden mdUp>
            <IconButton
              onClick={toggleDrawer('right', true)}
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
          </Hidden>
          {links.map(link => {
            return (
              <Hidden key={link.name} smDown>
                <Link href={`#${link.id}`}>
                  <Button
                    color="primary"
                    style={{ color: link.name === 'GET TICKET' && 'white' }}
                    className={classes.button}
                    variant={link.name === 'GET TICKET' ? 'contained' : 'text'}
                  >
                    {link.icon} &nbsp;
                    {link.name}
                  </Button>
                </Link>
              </Hidden>
            )
          })}
          <Hidden smDown>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">
              <Button color="primary" className={classes.button}>
                <GitHubIcon />
              </Button>
            </a>
          </Hidden>
        </Toolbar>
      </AppBar>
    </div>
  )
}

Header.propTypes = {
  toggleDrawer: PropTypes.func.isRequired,
  links: PropTypes.array.isRequired
}

export default Header
