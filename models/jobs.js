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

module.exports.getJobById = function(id, callback){

    Jobs.findById(id,callback)
}

//This function checks if the job is already in the database based the company and job title you entered
//Enables you to apply to one company but different positions
module.exports.getJob = function (companyName, jTitle, callback){

    var query = {company: companyName, jobTitle:jTitle}
    Jobs.findOne(query, callback)
}

module.exports.delete = function (companyName, jobtitle, callback){
    var query = {company: companyName, jobTitle:jobtitle}
    Jobs.findOne(query, (err,doc) =>{
        if(err) { throw err}
        
        //Delete from users jobList aswell
        const username = doc.userName
        User.update({username:username},{"$pull":{"jobsList":query}},{safe:true},function(errr,del){
            if(errr) throw errr
            console.log(del)
            User.findOne({username:username}, (err,doc)=>{
                doc.numOfJobs = doc.jobsList.length
                doc.save()
            })
        })


        doc.remove(callback)
    })
}

module.exports.updateJob = function(editedJob, callback){
    var company = editedJob.company
    var jobTitle= editedJob.jobTitle
    var location = editedJob.location
    var notes = editedJob.notes
    var link = editedJob.link
    var status = editedJob.status
    var query = {company: company, jobTitle:jobTitle}

    Jobs.findOne(query, (err,doc)=>{
        if(err) throw err
        
        doc.company = company
        doc.jobTitle = jobTitle
        doc.location = location
        doc.notes = notes
        doc.link = link
        doc.status = status

        //Delete from users jobList aswell
        const username = doc.userName
        User.update({username:username},{"$set":{"jobsList":doc}},{safe:true},function(errr,save){
            if(errr) throw errr
            console.log(save)
            User.findOne({username:username}, (err,doc)=>{
                doc.numOfJobs = doc.jobsList.length
                doc.save()
            })
        })




        doc.save(callback)

    })
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