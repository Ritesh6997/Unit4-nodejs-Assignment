const express = require('express')
const User = require('../model/user')
const AdminId = require('../model/admin')
const { populate } = require('../model/user')
const router = express.Router()
const nodemailer = require('nodemailer')
const transporter = require('../configu/mail')

/*

let info = await transporter.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to: "bar@example.com, baz@example.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  });
*/

router.get('', async (req, res) => {
  try {
    console.log(1)
    const page = req.query.page || 1;
    const pagesize = req.query.pagesize || 10; // 30
    const skips=(page-1)*pagesize;
    const user = await User.find().skip(skips).limit(pagesize).lean().exec()
    return res.status(200).send(user) // []
  } catch (err) {
    return res
      .status(500)
      .send({ message: 'Something went wrong .. try again later' })
  }
})

router.post('', async (req, res) => {
  try {
    user = await User.create(req.body)
    if (user.type == 'admin') {
      const AdminIdarr = await AdminId.findOne().lean().exec()
      AdminIdarr.adminId.push(user._id)
      let admin1 = await AdminId.findByIdAndUpdate(
        { _id: AdminIdarr._id },
        { $set: AdminIdarr },
      )
      return res.status(200).send({ User: user}) 
    }
else{
    const AdminIdarr = await AdminId.findOne()
      .populate({
        path: 'adminId',
      })
      .lean()
      .exec()
    let emailarr = [req.body.email]
    for (let i = 0; i < AdminIdarr.adminId.length; i++) {
      emailarr.push(AdminIdarr.adminId[i].email)
    }
    console.log(emailarr)
    
    
      for (let i = 0; i < emailarr.length; i++) {
        if (i == 0) {
          let info = await transporter.sendMail({
            from: '"Fred Foo 👻" <foo@example.com>', // sender address
            to: emailarr[i], // list of receivers
            subject: `Welcome to ABC system ${user.firstName} ${user.lastName}`, // Subject line
            text: `Hi ${user.firstName} Please confirm your email address`, // plain text body
            html: '<b>Hello world?</b>', // html body
          })
        } else {
          let info = await transporter.sendMail({
            from: '"Fred Foo 👻" <foo@example.com>', // sender address
            to: emailarr[i], // list of receivers
            subject: `${user.firstName} ${user.lastName} has registered with us `
            , // Subject line
            text: `Please welcome ${user.firstName} ${user.lastName}`
            , // plain text body
            html: '<b>Hello world?</b>', // html body
          })
        }
       
    }
    return res.status(200).send({ User: user, Ad1: AdminIdarr }) 
   }
   
  } 
  catch (error) {
    return res
      .status(500)
      .send({ message:error.message+'Something went wrong .. try again later' })
  }
})

module.exports = router
