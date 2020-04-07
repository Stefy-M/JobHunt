import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {FlashMessagesService} from 'angular2-flash-messages';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.css']
})

/*
Planning to use Accordion sections to show list of jobs
http://ng-lightning.github.io/ng-lightning/#/components/accordion
 */
export class CompanyListComponent implements OnInit {

  jobs: any;
  active = 'B';

  constructor(private authservice: AuthService,
              private flashMessage: FlashMessagesService) { }

  ngOnInit() {

    if( this.jobs = this.authservice.getJobs()){
      console.log(this.jobs);
    } else {
      this.flashMessage.show('Company List is not Loading Properly',{cssClass: 'alert-danger', timeout: 6000})
    }
    
  }

}
