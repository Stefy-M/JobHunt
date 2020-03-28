const mongoose = require('mongoose');
const User = require('../models/users')

const JobsSchema = mongoose.Schema({
    company: {
        type: String
    },

    jobTitle : {
        type: String
    },
    location: {
        type: String
    },
    notes: {
        type: String
    },
    link:{
        type :String
    },
    status:{
        type: String,
        enum: ['Pending','Rejected','In Progress']
    },
    userName: {
        type: String
    }
});

const Jobs = module.exports = mongoose.model('Jobs',JobsSchema);

module.exports.getUserById = function(id, callback){

    Jobs.findById(id,callback)
}

//This function checks if the job is already in the database based the company and job title you entered
//Enables you to apply to one company but different positions
module.exports.exist = function (companyName, jTitle){

    var query = {company: companyName, jobTitle:jTitle}
    Jobs.findOne(query, (err,res)=>{
        if(err){
            return false;
        }

        console.log(res);
        return true;

    });

}

module.exports.addJob = function(newJob, callback){

    //Check if job allready exist 
    /*if(!newJob.exist()){

    }*/

    newJob.save(callback)


}


//Returns a user document if the player exist, Queries database by username
//*Note: will need validation checking to make sure similiar usernames dont exist
module.exports.checkUsername = function(username, callback){
    
    User.getUserByUsername(username,callback)
        
    
}