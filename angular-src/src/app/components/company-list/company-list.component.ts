import { Component, OnInit, OnDestroy } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {TableModule} from 'primeng/table';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.css']
})


export class CompanyListComponent implements OnInit, OnDestroy {
  
  jobDetail : any;
  selectedJob :any;
  displayDialog : boolean;
  jobs: any;
  
  

  constructor(private authservice: AuthService,
              private flashMessage: FlashMessagesService) { }

  ngOnInit() {
    

    if( this.jobs = this.authservice.getJobs() ){
      console.log(this.jobs);
    } else {
      this.flashMessage.show('Company List is not Loading Properly',{cssClass: 'alert-danger', timeout: 6000})
    }

    

    
  
    
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    
  }

  showDialogToAdd(){
    this.jobDetail = {}
    this.flashMessage.show('Add button pressed!',{cssClass: 'alert-success', timeout: 1000});
    this.displayDialog = true;
  }

  onRowSelect(event){
    console.log(event.data)
    this.jobDetail = event.data
    this.displayDialog = true;
    
  }


  save(){

    

  }
  delete(){

  }


}
