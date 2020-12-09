import React from 'react'

import { Header, HowItWorks, AboutUs, Faq, GetTicket, Contact } from './components'

import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'

const useStyles = makeStyles(theme => ({
  header: {
    padding: '0 20px',
    position: 'relative',
    minHeight: '90vh',
    backgroundImage: "url('header_bg_600.png')",
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
    backgroundSize: '100%',

    [theme.breakpoints.up('md')]: {
      backgroundImage: "url('header_bg_1280.png')"
    }
  }
}))

const Index = () => {
  const classes = useStyles()

  return (
    <>
      <Grid container justify="center" alignItems="center" className={classes.header}>
        <div
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.6)',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%'
          }}
        ></div>
        <Header />
      </Grid>
      <Grid container justify="center">
        <span id="how-it-works">
          <HowItWorks />
        </span>
        <span id="book-flight">
          <GetTicket />
        </span>
        <span id="faq">
          <Faq />
        </span>
        <span id="about-us">
          <AboutUs />
        </span>
        <span id="contact">
          <Contact />
        </span>
      </Grid>
    </>
  )
}

export default Index
