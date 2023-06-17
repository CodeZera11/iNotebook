const express = require('express');
const router = express.Router();
const User = require('../models/User')

// Creating a User using POST "/api/auth". Doesn't require auth 
router.post('/',(req,res,next)=>{
    console.log(req.body);
    const user = User(req.body);
    user.save();
    res.send("Successful")
})

module.exports = router;