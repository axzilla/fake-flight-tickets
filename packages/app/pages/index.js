import React from 'react'
import axios from 'axios'
import { Home } from '../views'
import { Layout } from '../layout'

const home = () => {
  async function awakeHerokuServer() {
    // const { data: res } = await axios.get('https://fake-flight-tickets-api.herokuapp.com/awake')
    const { data: res } = await axios.get(`${process.env.API_URL}/awake`)
    console.log(res) // eslint-disable-line
  }

  awakeHerokuServer()

  return (
    <Layout>
      <Home />
    </Layout>
  )
}

export default home
