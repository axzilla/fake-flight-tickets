const dotenv = require('dotenv')

dotenv.config()

module.exports = {
  env: {
    API_URL: process.env.API_URL
  }
}
