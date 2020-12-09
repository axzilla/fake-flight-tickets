import React from 'react'

import { Section, SectionHeadlines } from '../../../../common'

import { makeStyles } from '@material-ui/core/styles'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

const useStyles = makeStyles(theme => ({
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: 'bold',
    flexBasis: '100%',
    flexShrink: 0
  }
}))

function Faq() {
  const classes = useStyles()
  const [expanded, setExpanded] = React.useState(false)

  const faqs = [
    {
      question: 'What is FakeFlightTickets?',
      answer: (
        <>
          FakeFlightTickets is a service which can assist you to show an onward ticket entering
          other countries. Maybe you have traveled a lot and found out that countries and airlines
          sometimes need a proof of leaving the country?
          <br />
          <br />
          Maybe you would like to apply for a visa in the country? Therefore you do not have a
          departure ticket right? Or you are doing a world travel and have a lot of time and do not
          even not know when to leave?
          <br />
          <br />
          Buying a “real ticket” can be annoying as it has to be canceled if you do not use it. If
          you forget it - ouch! Feels like seeing your money burning right in front of you.
          <br />
          <br />
          We are annoyed by this too and created this dummy onward ticket generator.
        </>
      )
    },
    {
      question: 'How does it work?',
      answer: (
        <>
          Let me explain. We take real flight data with your personal data and create a real looking
          booking confirmation.
          <br />
          <br />
          You will be asked for an onward ticket at the airport. They will check the date, flight
          number and your name. Usually they don’t ask for the Itinerary number. If so you can
          always say that you have just bought the ticket and Expedia has not yet sent you one. Look
          confident and not desperate - try it with an smile.
        </>
      )
    },
    {
      question: 'How to use?',
      answer: (
        <>
          You should make sure that your onward travel ticket is a different airline than the one
          you are flying with. I do not know if your name will be checked for the flight you choose.
          Just in case - make sure - don’t do that.
          <br />
          <br />
          Keep cool. Try to smile. If you look like you were just robbed it could look weird. You
          are flying on vacation. You should be happy.
          <br />
          <br />
          Have the ticket ready. If you have to search for a long time, this could also be stressful
          for you.
          <br />
          <br />
          Again if they ask for an Itinerary number, tell them you don’t have it yet, because you
          just booked the flight.
          <br />
          <br />
          Don’t forget to smile.
        </>
      )
    },
    {
      question: 'Is this a real flight ticket?',
      answer: (
        <>
          No. This ticket has real flight information and looks 100% like an original ticket. But
          don’t try to use it for a real flight.
        </>
      )
    },
    {
      question: 'Is a onward flight ticket required?',
      answer: (
        <>
          You never know. Sometimes you will be asked and sometimes not. In my experience I was
          asked a few times. I was lucky to have time to catch my next flight so I was able to book
          an onward ticket at the airport.
          <br />
          <br />
          Many countries require an onward ticket. They want to be sure that people will leave their
          country even if the passenger ran out of money.
        </>
      )
    },

    {
      question: 'Is this website secure?',
      answer: (
        <>
          Yes, FakeFlightTickets runs on a HTTPS protocol, with an SSL certificate verified by
          Let&apos;s Encrypt. Also our payment processes with https://www.paypal.com are secure.
        </>
      )
    }
  ]

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false)
  }

  return (
    <Section>
      <SectionHeadlines headline="FAQ" subHeadline="Frequently Asked Questions" />
      {faqs.map(faq => {
        return (
          <ExpansionPanel
            key={faq.question}
            expanded={expanded === faq.question}
            onChange={handleChange(faq.question)}
          >
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`${faq.question}-content`}
              id={`${faq.question}-header`}
            >
              <Typography className={classes.heading}>{faq.question}</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Typography>{faq.answer}</Typography>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        )
      })}
    </Section>
  )
}

export default Faq
