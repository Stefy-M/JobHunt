const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


//User Schema
const UserSchema = mongoose.Schema({
    name:{
        type: String
    },
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    numOfJobs: {
        type: Number
    },
    jobsList : {
        type : Array
    }

});


const User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserById = function(id, callback){

    User.findById(id,callback)
}

module.exports.getUserByUsername = function(username , callback){

    const query = {username: username}
    User.findOne(query,callback) 
    /*(err,res) =>{
        console.log("Result of findOne(): "+ res);
        if(err){
            throw new err
        }
        if(res){
            results = true
            
        }
        else{
            results = false
        }
    })

    console.log(results)
    
    return results*/
}




module.exports.addUser = function(newUser, callback){
    bcrypt.genSalt(10 ,(err,salt) => {
        bcrypt.hash(newUser.password, salt,(err,hash) =>{
            if(err){console.log(err) }
            newUser.password = hash

            newUser.save(callback)

        } )
    })
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
    bcrypt.compare(candidatePassword,hash,(err, isMatch) =>{
        if(err) throw err;
        callback(null, isMatch)
    })

}

module.exports.addJobToUser = function(jobObject, callback){
    
    

}


