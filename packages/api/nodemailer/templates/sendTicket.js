const transporter = require('../transporter')

module.exports = (pdf, email) => {
  const mailOptions = {
    from: 'noreply@fakeflighttickets.dev',
    to: email,
    subject: '#1 Fake Flight Ticket',
    attachments: [
      {
        filename: 'flight_ticket.pdf',
        content: pdf,
        contentType: 'application/pdf'
      }
    ],
    html: `
        Hi ${email},<br><br>
        you can find your fake flight ticket in the attachments.<br>
        Thanks, #1 Fake Flight Ticket.<br><br>
    `
  }

  transporter.sendMail(mailOptions, error => {
    error ? console.log(error) : console.log(`Mail sent to ${email}`) // eslint-disable-line no-console
  })
}
