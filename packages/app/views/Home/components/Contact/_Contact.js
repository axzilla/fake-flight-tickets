import React from 'react'

import { Section, SectionHeadlines } from '../../../../common'

import Grid from '@material-ui/core/Grid'
import { Link as MuiLink } from '@material-ui/core'
import LanguageIcon from '@material-ui/icons/Language'

function Contact() {
  return (
    <Section>
      <SectionHeadlines
        headline="Contact"
        subHeadline={
          <>
            If you have any questions, suggestions or requests then do not hesitate to contact us.
            <Grid container justify="center">
              <MuiLink href="https://www.badazz.dev" target="_blank">
                <LanguageIcon fontSize="large" />
              </MuiLink>
            </Grid>
          </>
        }
      />
    </Section>
  )
}

export default Contact
