const dotenv = require('dotenv')

dotenv.config()

module.exports = {
  env: {
    API_URL: process.env.API_URL,
    FT_PAYPAL_SANDBOX_CLIENT_ID: process.env.FT_PAYPAL_SANDBOX_CLIENT_ID,
    FT_PAYPAL_PRODUCTION_CLIENT_ID: process.env.FT_PAYPAL_PRODUCTION_CLIENT_ID
  }
}
