const express = require('express');
const router = express.Router();
const User = require('../models/users')

const Job = require('../models/jobs');
/*
company
jobTitle
location
notes
link
status*/
router.get('/add/:userEmail', (req,res,next)=>{

    var jobObject = {}
    const job = new Job({
        company: req.body.company,
        jobtitle: req.body.jobTitle,
        location: req.body.location,
        notes: req.body.notes,
        link: req.body.link,
        status: req.body.status,
        userEmail: req.params.userEmail

    });


    console.log(job)
    Job.checkEmail(job.userEmail,(err,success) =>{
        if(err){}
        if(success){
            jobObject = success
        }
        else{
            res.json({success:false, msg: 'User does not exist'})
        }
    })

    Job.addJob(job, (err,usr)=>{
        if(err){
            res.json({success:false, msg: 'Failed to add job'})
            
        }
        else{
            //res.json({success:true, msg: 'Job added',jobObject})
            //console.log(usr)
        }
    })
});

module.exports = router;