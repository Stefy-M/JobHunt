import { Component, OnInit } from '@angular/core';
import {JobService} from '../../services/job.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {ValidateService} from '../../services/validate.service';



@Component({
  selector: 'app-company-add',
  templateUrl: './company-add.component.html',
  styleUrls: ['./company-add.component.css']
})
export class CompanyAddComponent implements OnInit {

  company:String
  jobTitle:String
  location:String
  notes:String
  link:String
  status:String

  constructor(private jobService:JobService, 
              private flashMessage:FlashMessagesService,
              private validateService: ValidateService) { }

  ngOnInit() {
  }

  onJobSubmit(){
    const job = {
      company : this.company,
      jobTitle: this.jobTitle,
      location: this.location,
      notes: this.notes,
      link: this.link,
      status: this.status

    }
    if (!this.validateService.validateJob(job)) {

      this.flashMessage.show('Must fill in company and a job title', {cssClass: 'alert-danger', timeout: 3000});

      return false;
    }

    this.jobService.addJob(job).subscribe(data =>{
      
      if ( data != null) {
        this.flashMessage.show('Successfully added a job', {cssClass: 'alert-success', timeout: 3000});
      
      } else {
        this.flashMessage.show('Something went wrong', {cssClass: 'alert-danger', timeout: 3000});
        
      }


    })
    
    
  }

}
