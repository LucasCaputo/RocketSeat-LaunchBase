const nodemailer = require('nodemailer')

module.exports = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "8bf06885e99bd1",
      pass: "771f4372f980e1"
    }
  });

