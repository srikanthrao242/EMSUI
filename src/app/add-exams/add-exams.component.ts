import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { NotificationService } from '../toastr-notification/toastr-notification.service';
import { ExamsService } from './exams.service';
import { getTodayDate } from '../helpers/util'
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-add-exams',
  templateUrl: './add-exams.component.html',
  styleUrls: ['./add-exams.component.css']
})
export class AddExamsComponent implements OnInit {


  ExamName = new FormControl('',[Validators.required])
  ExampFor = new FormControl('',[Validators.required])
  TotalMarks = new FormControl('',[Validators.required])
  ExamDate = new FormControl('',[Validators.required])

  newExam = new FormGroup({
    ExamName: this.ExamName,
    ExampFor: this.ExampFor,
    ExamDate : this.ExamDate,
    TotalMarks: this.TotalMarks
  })

  constructor(private formBuilder: FormBuilder, private notifications: NotificationService,
    private examService: ExamsService) { }

  ngOnInit() {
  }

  get f() { return this.newExam.controls; }

  saveExam(){
    if(this.newExam.invalid)
       this.notifications.error("exam not saved");
    else{
      var inputs = this.newExam.value;
      var req = {
        'ExamName' : inputs.ExamName ,
        'ExamFor' : inputs.ExampFor ,
        'ExamDate' : inputs.ExamDate ,
        'TotalMarks': (+inputs.TotalMarks),
        'CreatedDate' : getTodayDate()
      }
      this.examService.addNewExam(req)
      .pipe(first())
          .subscribe(
              data => {
                this.notifications.success("Successfully created new Exam");
              },
              error => {
                this.notifications.error("creating Exam failed "+ error);
              });
    }
  }

}
