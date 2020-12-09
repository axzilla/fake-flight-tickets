import React from 'react'
import PropTypes from 'prop-types'

import { Link } from '../common'

import { makeStyles } from '@material-ui/core/styles'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'

const useStyles = makeStyles({
  list: {
    width: 250
  },
  fullList: {
    width: 'auto'
  }
})

function Drawer({ toggleDrawer, state, links }) {
  const classes = useStyles()

  const sideList = side => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
      <List>
        {links.map(link => (
          <Link href={`#${link.id}`} key={link.name}>
            <ListItem button key={link.name}>
              <ListItemIcon>{link.icon}</ListItemIcon>
              <ListItemText primary={<strong>{link.name}</strong>} />
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
    </div>
  )

  return (
    <div>
      <SwipeableDrawer
        anchor="right"
        open={state.right}
        onClose={toggleDrawer('right', false)}
        onOpen={toggleDrawer('right', true)}
      >
        {sideList('right')}
      </SwipeableDrawer>
    </div>
  )
}

Drawer.propTypes = {
  state: PropTypes.object.isRequired,
  toggleDrawer: PropTypes.func.isRequired,
  links: PropTypes.array.isRequired
}

export default Drawer
