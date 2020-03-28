const express = require('express');
const router = express.Router();

const User = require('../models/users');

//Register 
router.get('/register', (req,res,next)=>{
    var newuser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        numOfJobs: req.body.numOfJobs

    })

    User.addUser(newuser, (err, usr) =>{
        if(err){
            res.json({success:false, msg: 'Failed to add user'})
            
        }
        else{
            res.json({success:true, msg: 'User registered'})
            //console.log(usr)
        }
    })
});

module.exports = router;