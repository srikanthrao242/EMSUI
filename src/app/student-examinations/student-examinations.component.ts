import { Component, OnInit } from '@angular/core';
import Academic from 'src/app/models/academics';
import { AcademicService } from 'src/app/academic/academic.service';

@Component({
  selector: 'app-student-examinations',
  templateUrl: './student-examinations.component.html',
  styleUrls: ['./student-examinations.component.css']
})
export class StudentExaminationsComponent implements OnInit {
  academicsNames: Academic[];

  constructor(
    private academicService: AcademicService) { }

  ngOnInit() {
    this.academicService.getAllAcademicNames().subscribe(
      data => this.academicsNames = data,
      error => console.error('There was an error!', error)
    );
  }

}
