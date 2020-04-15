import { Component, OnInit, OnDestroy } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {JobService} from '../../services/job.service';
import {FlashMessagesService} from 'angular2-flash-messages';


@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.css']
})


export class CompanyListComponent implements OnInit{
  
  jobDetail : any;
  selectedJob :any;
  displayDialog : boolean;
  jobs: any;
  
  

  constructor(private authservice: AuthService,
              private flashMessage: FlashMessagesService,
              private jobService: JobService) { }

  ngOnInit() {
    if( this.jobs = this.authservice.getJobs() ){
      this.updateUser()
    } else {
      this.flashMessage.show('Company List is not Loading Properly',{cssClass: 'alert-danger', timeout: 6000})
    }
  }

  //Used to update user object everytime an event happens so data shown can be accurate
  updateUser(){
    this.authservice.getUser(JSON.parse(localStorage.getItem('User')).username).subscribe(res =>{
      let obj = {} as any;
      let user = {} as any
      obj = res.body
      user = obj.user
      user.numOfJobs = user.jobsList.length
      localStorage.setItem('User', JSON.stringify(user));
      this.jobs = user.jobsList
    })
  }

  refresh(){
    
    this.jobDetail = {}
    this.flashMessage.show('Table refreshed!',{cssClass: 'alert-success', timeout: 1000});
    this.updateUser();
  }

  onRowSelect(event){
    this.jobDetail = event.data
    this.displayDialog = true;
    this.updateUser();
    
  }


  


  save(){
    const newJob = this.selectedJob
    this.jobService.updateJob(newJob).subscribe()
    this.displayDialog = false;
    this.updateUser();
    

    
  }
  delete(){
    const companyName = this.selectedJob.company
    const jobTitle = this.selectedJob.jobTitle
    this.jobService.deleteJob(companyName,jobTitle).subscribe();
    this.displayDialog = false;
    this.updateUser();
  }


}
