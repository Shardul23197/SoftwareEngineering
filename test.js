const nodemailer = require('nodemailer');
const path = require("path");
const util = require('util')
require("dotenv").config({ path: path.resolve(__dirname, './config/.env') }); // Load env variables;

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: `fitocity.recovery@gmail.com`,
        pass: `mbvxwmxzjbwftpqb`
    }
});
console.log(util.inspect(transporter));


const mailOptions = {
    from: `fitocity.recovery@gmail.com`,
    to: `dylanh.3006@gmail.com`,
    subject: 'Link To Reset Password',
    text:
      'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n'
      + 'Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n'
      + 'If you did not request this, please ignore this email and your password will remain unchanged.\n',
};


transporter.sendMail(mailOptions, (err, response) => {
    if (err) {
      console.error('there was an error: ', err);
    } else {
      console.log('here is the res: ', response);
      res.status(200).json('recovery email sent');
    }
  });