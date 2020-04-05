import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: any;
  
  constructor(private authservice: AuthService) { }

  ngOnInit() {

    
    this.authservice.getProfile().subscribe(res =>{
      let profile = {} as any;
      profile = res.body;
      this.user = profile.user;
      localStorage.setItem('User', JSON.stringify(this.user));
      
    },
    err => {
      console.log(err);
      return false;

    })
  }


  }
