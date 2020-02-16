import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams, HttpRequest } from '@angular/common/http';
import { config } from '../Config';
import { Router } from '@angular/router';
import { Classes, ClassSections } from '../models/classesAndSections';
import StudentDetails, { ParentDetails } from '../models/students';
import { BehaviorSubject } from 'rxjs';
import { EmsUtilService } from '../emlsUtil/ems-util.service';
import { NotificationService } from '../toastr-notification/toastr-notification.service';
import { map } from 'rxjs/internal/operators/map';

@Injectable({
  providedIn: 'root'
})
export class StudentClassService {

  user = JSON.parse(localStorage.getItem('currentUser'));

  classSecURL = `${config.server.serverURL}/api/classes/sections/${this.user.id}`;

  studentProfileImgURL = `${config.server.serverURL}/api/student-profile`;

  studentURL = `${config.server.serverURL}/api/student-details/${this.user.id}`;

  studentDetailsURL = `${this.studentURL}/students`;

  studentProfileURL = `${config.server.serverURL}/api/student-details/${this.user.id}/profile`;

  constructor(private http: HttpClient, private router: Router, private emsUtilService: EmsUtilService,
    private _notificationservice:NotificationService) { }

  dialogData: any;

  dataChange: BehaviorSubject<any> = new BehaviorSubject<any[]>([]);


  get data(): any[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  addClassSections(json:any) {
    this.http.post(this.classSecURL, json)
    .subscribe(
      (val) => {
        this._notificationservice.success("classes added successfull");
          this.router.navigate(['/classes']);
          console.log(" call successful value returned in body", val);
      },
      response => {
          console.log(" call in error", response);
      },
      () => {
        this._notificationservice.success("classes adding completed");
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

  getParentDetails(studentId:number){
    return this.http.get<ParentDetails>(`${this.studentURL}/parent/${studentId}`)
  }


  getStudentDetails(req:any) : void {
    let params = new HttpParams().set("academicID",req.academicID).set("classID", req.classID).set("sectionID",req.sectionID);
    this.http.get<StudentDetails[]>(this.studentDetailsURL, {params:params}).subscribe(data => {
      data.forEach(v=> {
        v.ProfileImage = `${this.studentProfileURL}/${v.StudentID}`
      });
      this.dataChange.next(data);
    },
    (error: HttpErrorResponse) => {
      this._notificationservice.error("got error while getting student details");
      console.log(error);
    });

  }

  loadImage(filePath){

    const formData = new FormData();
    formData.append('image', filePath);

    const params = new HttpParams();

    const options = {
        params,
        reportProgress: true,
    };
    const req = new HttpRequest('POST', `${this.studentProfileImgURL}`, formData, options);
    return this.http.request(req);
  }

  updateStudentDetails(parent: ParentDetails, student: StudentDetails){
    var req = {'parent':parent, 'student':student};
    console.log(req);
    return this.http.put(`${this.studentURL}/update-student`, req)
    .subscribe(data=>{
      this._notificationservice.success(`${data}  successfully updated student details `);
      this.router.navigate(['/student-list']);
    })
  }

}
