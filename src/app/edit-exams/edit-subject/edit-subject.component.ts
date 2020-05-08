import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ExamSubjects } from 'src/app/models/classesAndSections';
import { FormGroup, FormControl } from '@angular/forms';
import { ExamsService } from 'src/app/add-exams/exams.service';
import { first } from 'rxjs/operators';
import { NotificationService } from 'src/app/toastr-notification/toastr-notification.service';

@Component({
  selector: 'app-edit-subject',
  templateUrl: './edit-subject.component.html',
  styleUrls: ['./edit-subject.component.css']
})
export class EditSubjectComponent implements OnInit {


  subjectEdit = new FormGroup({
    Subject: new FormControl(),
    TotalMarks: new FormControl(),
    ExamDate: new FormControl()
  });

  constructor(public dialogRef: MatDialogRef<EditSubjectComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ExamSubjects,
    private examServices: ExamsService,
    private notifications: NotificationService) {
      this.f.Subject.setValue(data.Subject);
      this.f.TotalMarks.setValue(data.TotalMarks);
      this.f.ExamDate.setValue(data.ExamDate);
    }

  get f() { return this.subjectEdit.controls; }

  ngOnInit() {
  }

  updateSubject(){

    this.data.Subject = this.f.Subject.value
    this.data.TotalMarks = this.f.TotalMarks.value
    this.data.ExamDate = this.f.ExamDate.value

    this.examServices.updateSubject(this.data)
    .pipe(first())
          .subscribe(
              data => {
                this.notifications.success("Successfully updated subject");
              },
              error => {
                this.notifications.error("update subject failed "+ error);
              });


  }
}

