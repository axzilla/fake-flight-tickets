import React from 'react'
import PropTypes from 'prop-types'

import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'

const useStyles = makeStyles(theme => ({
  root: { marginBottom: theme.spacing(5) }
}))

function SectionHeadlines({ headline, subHeadline }) {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Typography align="center" variant="h4">
        <Box fontWeight="bold" letterSpacing={2}>
          {headline}
        </Box>
      </Typography>
      <Typography variant="subtitle1" align="center" color="textSecondary">
        {subHeadline}
      </Typography>
    </div>
  )
}

SectionHeadlines.propTypes = {
  headline: PropTypes.string.isRequired,
  subHeadline: PropTypes.object.isRequired
}

export default SectionHeadlines
