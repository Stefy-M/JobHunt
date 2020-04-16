import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import { map } from 'rxjs/operators';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authToken : any;
  user: any;

  constructor(private http: HttpClient) { }

  registerUser(user) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post('users/register', user, {
      headers: headers,
      observe: 'response'
    }).pipe(map((res: HttpResponse<JSON>) => res));

  }

  authenticateUser(user){
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post('users/authenticate',user, {
      headers: headers,
      observe: 'response'
    }).pipe(map((res: HttpResponse<JSON>) => res));
  }


  storeUserData(token, user) {
    this.authToken = token;
    this.user = user;
    localStorage.setItem('Token',token);
    localStorage.setItem('UserObject',JSON.stringify(user));

  }

  getUser(userName){
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.get('users/getuser/'+userName, {
      headers: headers,
      observe: 'response'
    }).pipe(map((res: HttpResponse<JSON>) => res));
  }


  loadToken() {
    const token = localStorage.getItem('Token');
    this.authToken = token;
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

  getProfile(){
    this.loadToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.authToken

    });
   // headers.append('Authorization', this.authToken);
    return this.http.get('users/profile', {
      headers,
      observe: 'response'
    }).pipe(map((res: HttpResponse<JSON>) => res));
  }

  loggedIn(){
    let jwtHelper = new JwtHelperService();
    if(localStorage.getItem('Token') == undefined){
      return false;
    }
    return !jwtHelper.isTokenExpired(localStorage.getItem('Token'));
  }

  // This method gets all jobs that are attached to the user object is stored in localStorage after authenication was succesful
  // in profile.component.ts 
  getJobs(){
    if(localStorage.getItem('User') != null ||localStorage.getItem('User') != undefined ){
      return JSON.parse(localStorage.getItem('User')).jobsList;
    }

    else{
      return null;
    }
  }
}



