import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { NotificationService } from '../toastr-notification/toastr-notification.service';
import { ExamsService } from './exams.service';
import { getTodayDate } from '../helpers/util';
import { first } from 'rxjs/operators';
import { AcademicService } from '../academic/academic.service';
import Academic from '../models/academics';
import { Classes, ClassSections } from '../models/classesAndSections';
import { StudentClassService } from '../student-classes/student-class.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-exams',
  templateUrl: './add-exams.component.html',
  styleUrls: ['./add-exams.component.css']
})
export class AddExamsComponent implements OnInit {


  selectedAcademic:string;
  selectedClass:string;
  selectedSection:string;
  academicsNames : Academic[];
  classes : Classes[];
  sections: ClassSections[];

  newExam = new FormGroup({
    ExamName: new FormControl('',[Validators.required]),
    ExamDate : new FormControl('',[Validators.required]),
    TotalMarks: new FormControl('',[Validators.required]),
    selectedAcademic : new FormControl('',[Validators.required]),
    selectedClass : new FormControl('',[Validators.required]),
    selectedSection: new FormControl('',[Validators.required])
  });

  constructor(private notifications: NotificationService,
    private examService: ExamsService,
    private academicService: AcademicService,
    private studentClassService: StudentClassService,
    private router: Router) { }

  ngOnInit() {
    this.academicService.getAllAcademicNames().subscribe(
      data => this.academicsNames = data,
      error => console.error('There was an error!', error)
    );
  }

  onChangeAcademic(){
    this.studentClassService.getClasses(+this.f.selectedAcademic.value).subscribe(
      data => this.classes = data,
      error => console.error('There was an error!', error)
    );
  }

  onChangeClass(){
    if(this.f.selectedClass.value && this.f.selectedClass.value !== "All"){
      this.studentClassService.getSections(+this.f.selectedClass.value).subscribe(
        data => this.sections = data,
        error => console.error('There was an error!', error)
      );
    }
  }

  get f() { return this.newExam.controls; }

  saveExam(){
    if(this.newExam.invalid)
       this.notifications.error("exam not saved");
    else{
      var inputs = this.newExam.value;
      var req = {
        'ExamName' : inputs.ExamName ,
        'ExamDate' : inputs.ExamDate ,
        'TotalMarks': (+inputs.TotalMarks),
        'CreatedDate' : getTodayDate()
      }
      if(this.f.selectedClass.value !== "All"){
        req['ExamFor'] = (+this.f.selectedClass.value);
      }else{
        req['ExamFor'] = 0;
      }
      req['AcademicID'] = (+this.f.selectedAcademic.value);

      this.examService.addNewExam(req)
      .pipe(first())
          .subscribe(
              data => {
                this.notifications.success("Successfully created new Exam");
                req["ExamID"] = data;
                this.router.navigate(['/add-exam-subs'], { queryParams: Object.assign(data,req) });
              },
              error => {
                this.notifications.error("creating Exam failed "+ error);
              });
    }
  }

}
