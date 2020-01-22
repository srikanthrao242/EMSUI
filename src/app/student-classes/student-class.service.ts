import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { config } from '../Config';

@Injectable({
  providedIn: 'root'
})
export class StudentClassService {

  user = JSON.parse(localStorage.getItem('currentUser'));

  classSecURL = `${config.server.serverURL}/api/classes/sections/${this.user.id}`

  constructor(private http: HttpClient) { }

  addClassSections(json:any) {
    this.http.post(this.classSecURL, json)
    .subscribe(
      (val) => {
          console.log(" call successful value returned in body", val);
      },
      response => {
          console.log(" call in error", response);
      },
      () => {
          console.log("The  observable is now completed.");
      });
  }

}
