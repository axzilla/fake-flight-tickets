import React from 'react'
import PropTypes from 'prop-types'

import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100vw',
    padding: theme.spacing(10, 3),
    backgroundColor: props => props.light && 'white'
  },
  subRoot: { width: 800 }
}))

function Section({ children, light }) {
  const classes = useStyles({ light })

  return (
    <Grid container justify="center" className={classes.root}>
      <div className={classes.subRoot}>{children}</div>
    </Grid>
  )
}

Section.propTypes = { children: PropTypes.node.isRequired, light: PropTypes.bool }

export default Section
