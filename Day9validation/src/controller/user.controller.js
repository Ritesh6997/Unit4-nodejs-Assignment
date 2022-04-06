const express = require('express')
const router = express.Router()
const User = require('../model/user')
const { body, validationResult } = require('express-validator')

router.get('', async (req, res) => {
  try {
    const users = await User.find().lean().exec()
    return res.status(200).send(users)
  } catch (error) {
    res.status(500).send({ message: message.error })
  }
})

router.post(
  '',
  body("pincode").isLength({min:6,max:6}),
  body('password').isLength({ min: 5 }),
  body ('age'). isNumeric({ min: 1, max: 100}),body('email').not().isEmpty().isEmail().
  custom(async(value) => {
      const user= await User.findOne({"email":value}).lean().exec();
      if (user) {
        throw new Error('Email is already register');
      }
      return true;
  }),body('confirm password').custom((value,{req})=>{
    if (value !== req.body.password) {
      throw new Error('Password confirmation does not match password');
    }
    return true;
  }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const user= await User.create(req.body);
    return res.status(200).send(user);
  },
)

module.exports = router
