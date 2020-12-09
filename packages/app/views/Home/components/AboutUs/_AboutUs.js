import React from 'react'

import { Section, SectionHeadlines } from '../../../../common'

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({ img: { maxWidth: '100%', opacity: 0.6 } })

function AboutUs() {
  const classes = useStyles()

  return (
    <Section light>
      <SectionHeadlines
        headline="ABOUT US"
        subHeadline={
          <>
            We are digital nomads who love to travel around the world. Because we never know how
            long we want to stay, it is always annoying for us to plan or buy a ticket we may not
            need. I believe that many people might think so too. That’s why we created this page to
            help you out. Don’t forget to smile.
          </>
        }
      />
      <img src="/dn_together.png" className={classes.img} />
    </Section>
  )
}

export default AboutUs
