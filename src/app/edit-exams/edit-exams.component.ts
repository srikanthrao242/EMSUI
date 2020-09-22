import { Component, OnInit } from '@angular/core';
import Academic from '../models/academics';
import { ClassSections, Classes, ExamSubjects } from '../models/classesAndSections';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ExamsService } from '../add-exams/exams.service';
import { NotificationService } from '../toastr-notification/toastr-notification.service';
import { addDays, getTodayDate } from '../helpers/util';
import { StudentClassService } from '../student-classes/student-class.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { EditSubjectComponent } from './edit-subject/edit-subject.component';


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
  ExamDate:string;
  TotalMarks:number;
  subjectsData: ExamSubjects[];
  examID:number;

  queryParams:Object

  editExam = new FormGroup({
    ExamName: new FormControl('',[Validators.required]),
    ExamDate : new FormControl('',[Validators.required]),
    TotalMarks: new FormControl('',[Validators.required]),
    selectedAcademic : new FormControl('',[Validators.required]),
    selectedClass : new FormControl('',[Validators.required]),
    selectedSection: new FormControl('',[Validators.required])
  });

  get f() { return this.editExam.controls; }

  getClasses(academicId:number, examfor:string){
    this.studentClassService.getClasses(academicId).subscribe(
      data => this.classes = data.map(v => {
        v["isSelect"] = ""+(v.ClassID == +examfor);
        return v;
      }),
      error => console.error('There was an error!', error)
    );
  }

  onChangeClass(SectionID:string){
    if(this.f.selectedClass.value && this.f.selectedClass.value !== "All"){
      this.studentClassService.getSections(+this.f.selectedClass.value).subscribe(
        data => this.sections = data.map(v => {
          v["isSelect"] = ""+(v.SectionID == +SectionID);
          return v;
        }),
        error => console.error('There was an error!', error)
      );
    }
  }

  updateExamTable(examID:number){
    this.examServices.getExamSubjects(examID).subscribe(
      data => {
          this.subjectsData = data as ExamSubjects[];
      },
      error => {
        console.log(error)
      });
  }

  deleteSub(subjectID:string){

    this.examServices.deleteSubject(+subjectID).subscribe(
      data => {
        this.notifications.success(`deleted successfully ${data}`);
      },
      error =>{
        this.notifications.error(`deletion failed ${error}`);
      }
    )

  }

  editSub(row:string){
    const dialogRef = this.dialog.open(EditSubjectComponent, {data:this.subjectsData.find(v=> ""+v.SubjectID == row)});
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  addNewSub(){
      var inputs = this.editExam.value;
      var req = {
        'ExamName' : inputs.ExamName ,
        'ExamDate' : inputs.ExamDate ,
        'TotalMarks': (+inputs.TotalMarks)
      }
      if(this.f.selectedClass.value !== "All"){
        req['ExamFor'] = (+this.f.selectedClass.value);
      }else{
        req['ExamFor'] = 0;
      }
      req['AcademicID'] = (+this.f.selectedAcademic.value);

      this.notifications.success("Successfully created new Exam");
      req["ExamID"] = this.examID;
      this.route.navigate(['/add-exam-subs'], { queryParams: req });

  }
//{"AcademicID":1,"CreatedDate":"2020-02-27","ExamDate":"2020-02-28","ExamFor":0,"ExamID":2,"ExamName":"Quarterly","TotalMarks":600,"sectionID":0}
  saveChanges(){

    var req = {};
    req["AcademicID"] = (+this.queryParams['AcademicID']);
    req['ExamID'] = this.queryParams['ExamID'];
    req['ExamName'] = this.f.ExamName.value;
    req['ExamFor'] = (+this.f.selectedClass.value);
    req['TotalMarks'] = this.f.TotalMarks.value;
    req['ExamDate'] = this.f.ExamDate.value
    req['CreatedDate'] = this.queryParams['CreatedDate'];
    req['sectionID'] = (+this.f.selectedSection.value);

    console.log(req);

  }

  constructor(
    private router:ActivatedRoute,
    private examServices: ExamsService,
    private notifications: NotificationService,
    private studentClassService: StudentClassService,
    private route: Router,
    public dialog: MatDialog
  ) {

    this.router
      .queryParams
      .subscribe(params =>{
        this.queryParams= params;
        this.examID = (+params.ExamID);
        this.getClasses(+params.AcademicID, params.ExamFor);
        this.updateExamTable(+params.ExamID);
        this.onChangeClass(params.sectionID)
        this.selectedAcademic = params.selectedAcademic;
        this.ExamName = params.ExamName;
        this.f.ExamName.setValue(params.ExamName);
        this.f.ExamDate.setValue(params.ExamDate);
        this.ExamDate = params.ExamDate;
        this.TotalMarks = params.TotalMarks;
        });

   }

  ngOnInit() {
  }

}
