import { Component, OnInit } from '@angular/core';
import Academic from 'src/app/models/academics';
import { AcademicService } from 'src/app/academic/academic.service';
import { StudentExaminationsService } from './student-examinations.service';
import { NotificationService } from '../toastr-notification/toastr-notification.service';

@Component({
  selector: 'app-student-examinations',
  templateUrl: './student-examinations.component.html',
  styleUrls: ['./student-examinations.component.css']
})
export class StudentExaminationsComponent implements OnInit {
  academicsNames: Academic[];

  selectedAcademic:string;
  examData:any;

  constructor(
    private academicService: AcademicService,
    private notifications: NotificationService,
    private studentExamSevices : StudentExaminationsService) { }

  ngOnInit() {
    this.academicService.getAllAcademicNames().subscribe(
      data => this.academicsNames = data,
      error => console.error('There was an error!', error)
    );
  }

  onSubmitAcademic(){
    this.studentExamSevices.getExamData(+this.selectedAcademic)
    .subscribe(
      data => {
          this.examData = data;
      },
      error => {
        this.notifications.error(`Got error while getting exam data`);
      });
  }
  startEdit(num:number, ExamID:string, ExamName:string, ExamFor:string, TotalMarks:String, ExamDate:string){

  }



}
