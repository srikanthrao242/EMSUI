import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import Employee, {EmployeeColumnsDesc, Salary, BankDetails} from '../../models/employees';
import { Router } from '@angular/router';
import { EmployeeService } from '../employee.service';

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

  employeeProfile : FormGroup ;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private employeeService: EmployeeService
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

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
          this.url_profile = event.target["result"];
      }
    }
  }

  mapToEmployee(json){

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
    result.employee.dateOfJoining = json.dateOfJoining;

  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.employeeProfile.invalid) {
        return;
    }
    this.loading = true;


  }

}
