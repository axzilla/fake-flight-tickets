import React from 'react'
import PropTypes from 'prop-types'

import Header from './_Header'
import Footer from './_Footer'
import Drawer from './_Drawer'

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import amber from '@material-ui/core/colors/amber'
import FlightIcon from '@material-ui/icons/Flight'
import LiveHelpIcon from '@material-ui/icons/LiveHelp'
import FaceIcon from '@material-ui/icons/Face'
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer'
import ContactsIcon from '@material-ui/icons/Contacts'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#ff5252'
    },
    secondary: amber
  }
})

function Layout({ children }) {
  const [state, setState] = React.useState({ right: false })

  const links = [
    { id: 'how-it-works', name: 'HOW IT WORKS', url: '', icon: <QuestionAnswerIcon /> },
    { id: 'faq', name: 'FAQ', url: '', icon: <LiveHelpIcon /> },
    { id: 'about-us', name: 'ABOUT US', url: '', icon: <FaceIcon /> },
    { id: 'contact', name: 'CONTACT', url: '', icon: <ContactsIcon /> },
    { id: 'book-flight', name: 'GET TICKET', url: '', icon: <FlightIcon /> }
  ]

  const toggleDrawer = (side, open) => event => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return
    }

    setState({ ...state, [side]: open })
  }

  return (
    <ThemeProvider theme={theme}>
      <Header toggleDrawer={toggleDrawer} links={links} />
      <Drawer toggleDrawer={toggleDrawer} state={state} links={links} />
      {children}
      <Footer toggleDrawer={toggleDrawer} links={links} />
    </ThemeProvider>
  )
}

Layout.propTypes = {
  children: PropTypes.node
}

export default Layout
