import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  constructor(private http: HttpClient) { }

  deleteJob(companyName, jobTitle){
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.delete('http://localhost:3000/jobs/delete/'+companyName+'&'+jobTitle, {
      headers: headers,
      observe: 'response'
    }).pipe(map((res: HttpResponse<JSON>) => res));


  }

  updateJob(newJob){
    const userName = JSON.parse(localStorage.getItem('User')).username;
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.put('http://localhost:3000/jobs/update/'+userName,newJob, {
      headers: headers,
      observe: 'response'
    }).pipe(map((res: HttpResponse<JSON>) => res));

  }

  addJob(jobObject){
    const userName = JSON.parse(localStorage.getItem('User')).username;
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/jobs/add/'+userName,jobObject, {
      headers: headers,
      observe: 'response'
    }).pipe(map((res: HttpResponse<JSON>) => res));
  }

  



}
