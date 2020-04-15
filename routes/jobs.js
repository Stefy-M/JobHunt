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
router.post('/add/:userName', (req,res,next)=>{

    var userObject = {}
    const job = new Job({
        company: req.body.company,
        jobTitle: req.body.jobTitle,
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

            //We are adding a job to database and pushing job to users jobList array
            Job.addJob(job, (err,usr)=>{
                if(err){
                    res.json({success:false, msg: 'Failed to add job'})
                    
                }
                else{
                    
                    userObject.jobsList.push(job)
                    userObject.numOfJobs = userObject.jobsList.length;
                    userObject.save()
                    res.json({success:true, msg: 'Job added',userObject})
                    
                }
            })
        }
        else{
            res.json({success:false, msg: 'User does not exist'})
            
        }
    })
});

router.get('/find',(req,res,next) =>{
    
    var query = {company:req.body.company, jobTitle:req.body.jobTitle}
    Job.findOne(query,(err,job) =>{

        if(err) throw new err

        if(job != null){
            res.json({success:true, jobObj: job});
        }
        else{
            res.json({success:false, msg:'Could not find job object'})
        }

    });
})

router.delete('/delete/:company&:jobTitle',(req,res,next)=>{

    const company = req.params.company
    const jobTitle = req.params.jobTitle

    Job.delete(company, jobTitle, (err, doc)=>{
        if (err) throw err
        if(doc){
            res.json({success:true, doc:doc,msg:'First Occurrence of the document is removed'})

        }
        else{
            res.json({success:false, msg:'Could not find job object to remove'})
        }

        
    })
})

router.put('/update/:userName', (req,res,next)=>{
    
    
    const editedJob = new Job({
        company: req.body.company,
        jobTitle: req.body.jobTitle,
        location: req.body.location,
        notes: req.body.notes,
        link: req.body.link,
        status: req.body.status,
        userName: req.params.userName

    });
    

    Job.updateJob(editedJob, (err,saved)=>{
        if(err) throw err
        if(saved){
            res.json({success:true, doc:saved,msg:'Job has been updated'})

        }
        else{
            res.json({success:false, msg:'Update failed'})
        }
        
    });
})



module.exports = router;