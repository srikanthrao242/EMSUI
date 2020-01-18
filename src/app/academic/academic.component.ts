import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators, FormGroup, AbstractControl } from '@angular/forms';
import { AcademicService } from './academic.service';
import Academic from '../models/academics';
import { addDaysFromDate } from '../helpers/util';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NotificationService } from '../toastr-notification/toastr-notification.service';

@Component({
  selector: 'app-academic',
  templateUrl: './academic.component.html',
  styleUrls: ['./academic.component.css']
})
export class AcademicComponent implements OnInit {

  academicNameController = new FormControl('',[Validators.required])
  academicStartDateController = new FormControl('',[Validators.required])
  academicEndYearController = new FormControl('',[Validators.required])

  academicFrom = new FormGroup({
    academicName: this.academicNameController,
    academicStartDate: this.academicStartDateController,
    academicEndYear : this.academicEndYearController
  })

  getAcademicNameError(){
    return this.academicNameController.hasError('required') ? 'You must enter a value' : '';
  }
  getAcademicStartDateError(){
    return this.academicStartDateController.hasError('required') ? 'You must enter a value' : '';
  }
  isGreaterThanStartYear(){
    return this.academicEndYearController.value > this.academicStartDateController.value.getFullYear();
  }
  getAcademicEndYearError(){
      return this.academicEndYearController.hasError('required') ? 'You must enter a value' : '' ;
  }


  constructor(private formBuilder: FormBuilder,
    private academicService:AcademicService,
    private router: Router,
    private _notificationservice:NotificationService) { }

  startNewAcademics(){
    if(this.academicFrom.invalid){
      return;
    }else{
      var academic = {} as Academic
      academic.AcademicName = this.academicNameController.value;
      academic.StartDate = addDaysFromDate(this.academicStartDateController.value,0);
      academic.EndYear = this.academicEndYearController.value;
      academic.IsActive = true;
      academic.IsCurrentAcademic = true;
      academic.UserID = this.academicService.user.id;
      this.academicService.startNewAcademic(academic)
          .pipe(first())
          .subscribe(
              data => {
                this._notificationservice.success("Successfully created academic year");
                this.router.navigate(['/studentWizard']);
              },
              error => {
                this._notificationservice.error("creating academic year failed "+ error);
              });
    }
  }

  ngOnInit() {
  }

}
