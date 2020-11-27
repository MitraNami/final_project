var express = require('express');
var router = express.Router();

const nodemailer = require("nodemailer");

const contactEmail = nodemailer.createTransport({
  host: process.env.NODEMAILER_HOST,
  port: 587,
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASS,
  },
});

// contactEmail.verify((error) => {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log("Ready to Send");
//   }
// });



router.post('/', (req, res) => {
  const {
    name,
    email,
    msg
  } = req.body;

  const mail = {
    from: name,
    to: "a.mxnami@gmail.com",
    subject: "StrongerU Contact Form",
    html: `<p>Name: ${name}</p><p>Email: ${email}</p><p>Message: ${msg}</p>`
  };

  contactEmail.sendMail(mail, error => {
    if (error) {
      res.json({ status: "failed" });
    } else {
      res.json({ status: "sent" });
    }
  });

});

module.exports = router;