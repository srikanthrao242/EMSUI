import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { config } from '../Config';

@Injectable({
  providedIn: 'root'
})
export class StudentExaminationsService {

  user = JSON.parse(localStorage.getItem('currentUser'));

  examURL = `${config.server.serverURL}/api/examination/${this.user.id}/exams`

  constructor(private http: HttpClient) { }

  getExamData(id:number) {
    return this.http.get(`${this.examURL}/${id}`);
  }

}
