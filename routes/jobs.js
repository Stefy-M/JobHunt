const express = require('express');
const router = express.Router();
const User = require('../models/users')

const Job = require('../models/jobs');
/*
Job Object:
company
jobTitle
location
notes
link
status
userName*/



/*
    To add a job username must be specified as a url parameter 
    this function first checks if the user exist then adds the job to database.

*/
router.get('/add/:userName', (req,res,next)=>{

    var userObject = {}
    const job = new Job({
        company: req.body.company,
        jobtitle: req.body.jobTitle,
        location: req.body.location,
        notes: req.body.notes,
        link: req.body.link,
        status: req.body.status,
        userName: req.params.userName

    });


    

    Job.checkUsername(job.userName,(err,userDocument) =>{
        
        if(err){throw new err}

        if(userDocument){

            userObject = userDocument
            Job.addJob(job, (err,usr)=>{
                if(err){
                    res.json({success:false, msg: 'Failed to add job'})
                    
                }
                else{
                    res.json({success:true, msg: 'Job added',userObject})
                    //console.log(usr)
                }
            })
        }
        else{
            res.json({success:false, msg: 'User does not exist'})
            
        }
    })
});

module.exports = router;