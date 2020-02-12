import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-student-edit',
  templateUrl: './student-edit.component.html',
  styleUrls: ['./student-edit.component.css']
})
export class StudentEditComponent implements OnInit {

  row:any;
  constructor(private router:ActivatedRoute) { }

  ngOnInit() {
    this.row = this.router
      .queryParams
      .subscribe(params => {
        console.log(params)
      });
  }

}
