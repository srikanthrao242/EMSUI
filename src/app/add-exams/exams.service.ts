import { Injectable } from '@angular/core';
import { config } from '../Config';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ExamsService {

  user = JSON.parse(localStorage.getItem('currentUser'));

  examURL = `${config.server.serverURL}/api/examination/${this.user.id}`

  constructor(private http: HttpClient) { }

  addNewExam(req:any){
    return this.http.post(`${this.examURL}/add-exam`, req);
  }

  getExamSubjects(examID:number){
    return this.http.get(`${this.examURL}/exam-subject/${examID}`);
  }

  addNewSub(req:any){
    return this.http.post(`${this.examURL}/add-exam-sub`, req);
  }


}
