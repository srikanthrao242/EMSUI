import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ExamsService } from '../add-exams/exams.service';
import { NotificationService } from '../toastr-notification/toastr-notification.service';
import { getTodayDate } from '../helpers/util';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-add-exam-subjects',
  templateUrl: './add-exam-subjects.component.html',
  styleUrls: ['./add-exam-subjects.component.css']
})
export class AddExamSubjectsComponent implements OnInit {

  constructor(private router:ActivatedRoute,
    private examServices: ExamsService,
    private notifications: NotificationService) { }
  params:any;
  subjectsData: Object;

  newExamSub = new FormGroup({
    Subject : new FormControl('',[Validators.required]),
    ExamDate: new FormControl('',[Validators.required]),
    TotalMarks : new FormControl('',[Validators.required])
  });

  get f() { return this.newExamSub.controls; }

  ngOnInit() {
    this.router
      .queryParams
      .subscribe(params =>{
        this.params = params;
        this.updateExamTable();
        });
  }

  updateExamTable(){
    this.examServices.getExamSubjects(+this.params.ExamID).subscribe(
      data => {
          this.subjectsData = data;
      },
      error => {
        console.log(error)
      });
  }

  saveExamSub(){
    if(this.newExamSub.invalid){
      this.notifications.error("Please fill the form correctly");
    }else{
      var req = {};
      req["ExamID"] = (+this.params.ExamID);
      req["Subject"] = this.f.Subject.value;
      req["CreatedDate"] = getTodayDate();
      req['TotalMarks'] = this.f.TotalMarks.value;
      req['ExamDate'] = this.f.ExamDate.value;
      this.examServices.addNewSub(req)
      .pipe(first())
          .subscribe(
              data => {
                this.notifications.success("Successfully created new subject");
                this.updateExamTable();
              },
              error => {
                this.notifications.error("creating subject failed "+ error);
              });
    }
  }










}
