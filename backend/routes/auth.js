const express = require('express');
const router = express.Router();
const User = require('../models/User')
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');

// Creating a User using POST "/api/auth". Doesn't require auth 
router.post('/createuser', [
    body('name', "Enter a valid name").isLength({min: 3}),
    body('email', "Enter a valid email").isEmail(),    
    body('password', "Enter a valid password").isLength({min: 5})
], async (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try{
      let user = await User.findOne({email: req.body.email});
      if(user){
        return res.status(400).json({error: "User with that email already exists."})
      }

      let salt = await bcrypt.genSalt(10);
      let hashedPassword = await bcrypt.hash(req.body.password, salt)

      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
      })

      res.send({user})

    }catch(err){
      // console.log(err)
      res.status(500).json({error: "server error"})
    }

})

module.exports = router;