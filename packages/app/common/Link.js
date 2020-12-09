import React from 'react'
import PropTypes from 'prop-types'
import NextLink from 'next/link'

import { makeStyles } from '@material-ui/core/styles'
import MuiLink from '@material-ui/core/Link'

const useStyles = makeStyles({
  link: {
    textDecoration: 'none',
    cursor: 'pointer',
    '&:hover': {
      textDecoration: 'none'
    }
  }
})

function Link({ href, children }) {
  const classes = useStyles()

  return (
    <NextLink href={href}>
      <MuiLink className={classes.link}>{children}</MuiLink>
    </NextLink>
  )
}

Link.propTypes = { children: PropTypes.node.isRequired, href: PropTypes.string.isRequired }

export default Link
