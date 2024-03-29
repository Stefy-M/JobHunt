const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/users')
const config = require('../config/database')


module.exports = function(passport){

    let opts = {}
    opts.secretOrKey = config.secret
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt')
    passport.use(new JwtStrategy(opts, (jwt_payload, done) =>{
       // console.log(jwt_payload)
        User.getUserById(jwt_payload._id, (err,user) =>{

            if(err) {
                return done(err,false)
            }
            if(user){
                return done(null,user)
            }
            else{
                return done(null,false)
            }
        })

    }))
}