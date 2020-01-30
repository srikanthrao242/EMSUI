import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { config } from '../Config';
import { Router } from '@angular/router';
import { Classes, ClassSections } from '../models/classesAndSections';
import StudentDetails from '../models/students';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentClassService {

  user = JSON.parse(localStorage.getItem('currentUser'));

  classSecURL = `${config.server.serverURL}/api/classes/sections/${this.user.id}`;

  studentDetailsURL = `${config.server.serverURL}/api/student-details/${this.user.id}/students`;

  constructor(private http: HttpClient, private router: Router) { }

  dialogData: any;

  dataChange: BehaviorSubject<StudentDetails[]> = new BehaviorSubject<StudentDetails[]>([]);


  get data(): StudentDetails[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  addClassSections(json:any) {
    this.http.post(this.classSecURL, json)
    .subscribe(
      (val) => {
          this.router.navigate(['/classes']);
          console.log(" call successful value returned in body", val);
      },
      response => {
          console.log(" call in error", response);
      },
      () => {
          console.log("The  observable is now completed.");
      });
  }

  getClassSections(academicId:number) {
    return this.http.get(`${this.classSecURL}/${academicId}`);
  }

  getClasses(academicId:number) {
    return this.http.get<Classes[]>(`${this.classSecURL}/class/${academicId}`);
  }

  getSections(classId:number) {
    return this.http.get<ClassSections[]>(`${this.classSecURL}/section/${classId}`);
  }


  getStudentDetails() : void {
    this.http.get<StudentDetails[]>(this.studentDetailsURL).subscribe(data => {
      this.dataChange.next(data);
    },
    (error: HttpErrorResponse) => {
      console.log(error);
    });

  }
}
