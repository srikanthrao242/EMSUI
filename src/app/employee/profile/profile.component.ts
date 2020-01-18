import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import Employee, {EmployeeColumnsDesc, Salary, BankDetails} from '../../models/employees';
import { Router } from '@angular/router';
import { EmployeeService } from '../employee.service';
import {addDaysFromDate} from '../../helpers/util';
import { AuthenticationService } from 'src/app/auth/authentication.service';
import { first } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  totalTax = 0.0;
  actualSalary = 0.0;
  salaryAfterTax = 0.0;
  salaryBeforeTax = 0.0;
  salaryPH = 0.0;
  url_profile = '../../../assets/images/icons8-user-male-skin-type-5-50.png';
  loading = false;
  submitted = false;
  userProfileImage = '';



  employeeProfile : FormGroup ;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private employeeService: EmployeeService,
    private authServices : AuthenticationService
    ) { }


  get f() { return this.employeeProfile.controls; }

  ngOnInit() {
    var validators = {};
    EmployeeColumnsDesc.forEach(v => {
      if(!validators.hasOwnProperty(v.name)){
        validators[v.name] = v.validators;
      }
    });
    this.employeeProfile = this.formBuilder.group(validators);
  }

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

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      var filePath = event.target.files[0];

      reader.readAsDataURL(filePath); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed

        this.employeeService.loadImage(filePath)
        .subscribe(
            data => {
              if(data instanceof HttpResponse){
                console.log("successfully loaded file", data);
                this.userProfileImage = (<HttpResponse<any>>data).body.fileName;
                this.url_profile = event.target["result"];
              }
            },
            error => {
              console.log(error);
            });
      }
    }
  }

  mapToInputForAdd(){
    var result = {
      'employee' : {} as Employee,
      'salary': {} as Salary,
      'bankDetails': {}as BankDetails
    }
    var json = this.employeeProfile.value

    result.employee.firstName = json.firstName;
    result.employee.lastName = json.lastName;
    result.employee.city = json.city;
    result.employee.address = json.address;
    result.employee.mobile = json.mobile;
    result.employee.dateOfJoining = addDaysFromDate(json.dateOfJoining,0);
    result.employee.email = json.email;
    result.employee.gender = json.gender;
    result.employee.designation = json.designation;
    result.employee.employeeType = json.employeeType;
    result.employee.qualification = json.qualification;
    result.employee.companyId = this.authServices.currentUserValue.companyid;
    result.employee.isActive = true;
    result.employee.employeeProfile = this.userProfileImage;

    result.salary.allowance = json.allowance;
    result.salary.allowanceDesc = json.allowanceDesc;
    result.salary.comments = json.comments;
    result.salary.deduction = json.deduction;
    result.salary.deductionDesc = json.deductionDesc;
    result.salary.salAfterTax = json.salAfterTax;
    result.salary.salBeforeTax = json.salBeforeTax;
    result.salary.salaryPerHour = json.salaryPerHour;
    result.salary.salaryPerMon = json.salaryPerMon;
    result.salary.tax = json.tax;
    result.salary.taxPercentage = json.taxPercentage;

    result.bankDetails.accNo = json.accNo;
    result.bankDetails.bankName = json.bankName;
    result.bankDetails.branchCode = json.branchCode;

    return result;
  }

  onSubmit() {
    this.submitted = true;
    this.employeeProfile.patchValue({
      salaryPerHour : this.salaryPH,
      salAfterTax:this.salaryAfterTax,
      salBeforeTax: this.salaryBeforeTax,
      tax : this.totalTax
    });
    console.log(this.employeeProfile.value)
    // stop here if form is invalid
    if (this.employeeProfile.invalid) {
        return;
    }
    this.loading = true;
    this.employeeService.addEmployees(this.mapToInputForAdd())
    .pipe(first())
    .subscribe(
        data => {
            this.router.navigate(['/employees']);
        },
        error => {
            this.loading = false;
        });


  }

}
