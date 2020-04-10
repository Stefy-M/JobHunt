const express = require('express')
const router = express.Router()
const passport = require('passport')
const jwt = require('jsonwebtoken')
const config = require ('../config/database')

const User = require('../models/users')



router.get('/getuser/:userName', (req,res,next)=>{

    const userName = req.params.userName

    User.getUserByUsername(userName, (err,user)=>{

        if(err){ throw err}

        if(user){
            res.json({success:true,user, msg: 'User found'})
        }
        else{
            res.json({success:true,user, msg: 'User not found'})
        }


    })

})
//Register 
router.post('/register', (req,res,next)=>{
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


//Authenticate 
router.post('/authenticate', (req,res,next) =>{
    const username = req.body.username
    const password = req.body.password

    User.getUserByUsername(username, (err, user) =>{

        if(err){ throw err}
        if(!user){
            return res.json({success: false, msg: 'User not found'})
        }

        User.comparePassword (password, user.password, (err, isMatch) =>{
            if(err) throw err;
            if(isMatch){
               // console.log(user)
                const token = jwt.sign(user.toJSON(),config.secret, {
                    expiresIn : 604800 //seconds
                    
                })

                res.json({
                    success: true,
                    msg: 'Login/Authentication Successful',
                    token: 'JWT ' + token,
                    user: {
                        id: user._id,
                        name: user.name,
                        username: user.username,
                        email: user.email
                    }
                })
            }
            else{

                return res.json({success: false, msg: 'Wrong password'})
            }
        })
    })
})


router.get('/profile', passport.authenticate('jwt',{session:false}),(req,res,next) =>{

    
    res.json({user:req.user})
})



module.exports = router;