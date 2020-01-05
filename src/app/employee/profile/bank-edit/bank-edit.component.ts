import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { EmployeeService } from '../../employee.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BankDetails, BankColumnDesc } from 'src/app/models/employees';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bank-edit',
  templateUrl: './bank-edit.component.html',
  styleUrls: ['./bank-edit.component.css']
})
export class BankEditComponent implements OnInit {


  employeeProfile : FormGroup ;
  employeeServices : EmployeeService

  constructor(
    public dialogRef: MatDialogRef<BankEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: BankDetails,
    private formBuilder: FormBuilder,
    private router: Router,
    employeeServices:EmployeeService) {
      this.employeeServices = employeeServices;
     }

  get f() { return this.employeeProfile.controls; }

  ngOnInit() {
    var validators = {};
    BankColumnDesc.forEach(v => {
      if(!validators.hasOwnProperty(v.name)){
        validators[v.name] = v.validators;
      }
    });
    this.employeeProfile = this.formBuilder.group(validators);
  }


  onSubmit(){
    if(this.employeeProfile.invalid)
      return;
    var emp = this.employeeProfile.value;
    emp.id = this.data.id;
    emp.employeeId = this.data.employeeId;
    this.employeeServices.updateBankProfile(emp).pipe().subscribe(
      data => {
        console.log(data);
          this.router.navigate(['/employees']);
      },
      error => {
        console.log(error);
      });

  }

  getErrorMessage() {
    return 'Required field / Contains Error' ;
  }


}
