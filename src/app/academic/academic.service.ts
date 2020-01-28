import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { config } from '../Config';
import Academic from '../models/academics';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AcademicService {

  user = JSON.parse(localStorage.getItem('currentUser'));

  academicURL = `${config.server.serverURL}/api/academics/${this.user.id}`

  studentURL = `${config.server.serverURL}/api/new-admission/${this.user.id}`

  constructor(private http: HttpClient) { }

  dataChange: BehaviorSubject<Academic[]> = new BehaviorSubject<Academic[]>([]);

  getAllAcademicDetails(){
    this.http.get<Academic[]>(`${this.academicURL}/all-academics`)
    .subscribe(data => {
        this.dataChange.next(data);
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      });
  }

  getAllAcademicNames(){
    return this.http.get<Academic[]>(`${this.academicURL}/all-academics`);
  }

  get data(): Academic[] {
    return this.dataChange.value;
  }

  startNewAcademic(academic:Academic){
    return this.http.post(`${this.academicURL}/new-academic`, academic);
  }

  addNewAdmission(req:any){
    return this.http.post(`${this.studentURL}`, req);
  }



}
