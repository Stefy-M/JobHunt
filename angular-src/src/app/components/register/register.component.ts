import { Component, OnInit } from '@angular/core';
import {ValidateService} from '../../services/validate.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  name: String;
  email: String; 
  username: String;
  password: String;
  numOfjobs: Number;
  jobsList: Array<Object>;


  constructor(private validateService:ValidateService,
              private flashMessage: FlashMessagesService,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
  }

  onRegisterSubmit(){
    const user = {
      name: this.name,
      email: this.email,
      username: this.username,
      password: this.password,
      numOfJobs: 0
    }

    if(!this.validateService.validateRegister(user)){
      
      this.flashMessage.show('Please Fill in all field', {cssClass: 'alert-danger', timeout: 3000});
      
      return false;
    }

    if(!this.validateService.validateEmail(user.email)){
      this.flashMessage.show('Please use a valid Email', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    // Regiser User
    this.authService.registerUser(user).subscribe(data => {
      if ( data != null) {
        this.flashMessage.show('You are now registered and can login', {cssClass: 'alert-success', timeout: 3000});
        this.router.navigate(['']);
      } else {
        this.flashMessage.show('Something went wrong', {cssClass: 'alert-danger', timeout: 3000});
        this.router.navigate(['/register']);
      }
    });

    

    
  }

}
