
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "4ed9f515948132", // generated ethereal user
      pass: "fa6ffcee872177", // generated ethereal password
    },
  });

  module.exports=transporter; 

