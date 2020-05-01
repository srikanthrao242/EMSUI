import { Component, OnInit } from '@angular/core';
import Academic from '../models/academics';
import { ClassSections, Classes } from '../models/classesAndSections';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ExamsService } from '../add-exams/exams.service';
import { NotificationService } from '../toastr-notification/toastr-notification.service';

@Component({
  selector: 'app-edit-exams',
  templateUrl: './edit-exams.component.html',
  styleUrls: ['./edit-exams.component.css']
})
export class EditExamsComponent implements OnInit {

  selectedAcademic:string;
  selectedClass:string;
  selectedSection:string;
  academicsNames : Academic[];
  classes : Classes[];
  sections: ClassSections[];
  ExamName:string;
  ExamDate:Date;
  TotalMarks:number;


  editExam = new FormGroup({
    ExamName: new FormControl('',[Validators.required]),
    ExamDate : new FormControl('',[Validators.required]),
    TotalMarks: new FormControl('',[Validators.required]),
    selectedAcademic : new FormControl('',[Validators.required]),
    selectedClass : new FormControl('',[Validators.required]),
    selectedSection: new FormControl('',[Validators.required])
  });

  get f() { return this.editExam.controls; }

  constructor(
    private router:ActivatedRoute,
    private examServices: ExamsService,
    private notifications: NotificationService
  ) {

    this.router
      .queryParams
      .subscribe(params =>{
        console.log(params);
        this.selectedAcademic = params.selectedAcademic;
        this.ExamName = params.ExamName;
        this.ExamDate = params.ExamDate;
        });

   }

  ngOnInit() {
  }

}
