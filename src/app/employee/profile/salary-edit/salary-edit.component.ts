import { Component, OnInit, Inject } from '@angular/core';
import { EmployeeService } from '../../employee.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Salary, SalaryColomnDesc } from 'src/app/models/employees';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-salary-edit',
  templateUrl: './salary-edit.component.html',
  styleUrls: ['./salary-edit.component.css']
})
export class SalaryEditComponent implements OnInit {

  totalTax = 0.0;
  actualSalary = 0.0;
  salaryAfterTax = 0.0;
  salaryBeforeTax = 0.0;
  salaryPH = 0.0;
  employeeProfile : FormGroup ;

  employeeServices : EmployeeService
  constructor(
    public dialogRef: MatDialogRef<SalaryEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Salary,
    private formBuilder: FormBuilder,
    private router: Router,
    employeeServices:EmployeeService) {
      this.salaryAfterTax = data.salAfterTax;
      this.salaryAfterTax = data.salBeforeTax;
      this.totalTax = data.tax;
      this.actualSalary = data.salaryPerMon;
      this.salaryPH = data.salaryPerHour;
      this.employeeServices = employeeServices;
     }

  get f() { return this.employeeProfile.controls; }


  getErrorMessage() {
    return 'Required field / Contains Error' ;
  }

  onKey(taxPer:number){
    if(!isNaN(taxPer)){
      this.totalTax = (this.actualSalary) * taxPer/100;
      this.salaryAfterTax = this.actualSalary - this.totalTax;
    }
  }

  onSalaryKey(spm:number){
    if(!isNaN(spm)){
      this.actualSalary = spm;
      this.salaryBeforeTax = spm;
    }
  }

  onAllowance(allowanceper:number){
    if(!isNaN(allowanceper)){
      const allowances = (this.actualSalary) * allowanceper/100;
      this.salaryBeforeTax = Number(this.actualSalary) + Number(allowances);
      this.salaryAfterTax = Number(this.salaryAfterTax) + Number(allowances);
    }
  }

  onDeduction(deductionPer :number){
    if(!isNaN(deductionPer)){
      const deduction = (this.actualSalary) * deductionPer/100;
      this.salaryBeforeTax = (this.actualSalary) - deduction;
      this.salaryAfterTax = (this.salaryAfterTax) - deduction;
    }
  }

  ngOnInit() {
    var validators = {};
    SalaryColomnDesc.forEach(v => {
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
    emp.employeeId = this.data.employeeId;
    emp.id = this.data.id;
    emp.salAfterTax = Number(this.salaryAfterTax);
    emp.salBeforeTax = Number(this.salaryBeforeTax);
    emp.tax = Number(this.totalTax);
    emp.salaryPerMon = Number(this.actualSalary);
    emp.salaryPerHour = Number(this.salaryPH);
    console.log(emp);
    this.employeeServices.updateSalaryProfile(emp).pipe().subscribe(
      data => {
        console.log(data);
          this.router.navigate(['/employees']);
      },
      error => {
        console.log(error);
      });

  }

}
