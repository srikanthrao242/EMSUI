import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import {Employee, EmployeeProfileColumnsDesc } from 'src/app/models/employees';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { EmployeeService } from '../../employee.service';
import { addDaysFromDate } from '../../../helpers/util';
import { EmsUtilService } from 'src/app/emlsUtil/ems-util.service';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit {

  employeeProfile : FormGroup ;
  url_profile = '../../../../assets/images/icons8-user-male-skin-type-5-50.png';
  employeeServices : EmployeeService
  isActive :boolean;
  url_pro_ser = ''
  isImageLoading = false;
  constructor(
    public dialogRef: MatDialogRef<ProfileEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private router: Router,
    employeeServices:EmployeeService,
    emsUtilService: EmsUtilService) {
      data.dateOfJoining = new Date(data.dateOfJoining);
      if(data.dateOfRelieving)
        data.dateOfRelieving = new Date(data.dateOfRelieving);
      this.employeeServices = employeeServices;
      this.isActive = data.isActive;
      emsUtilService.getImageFromService(this,`${employeeServices.getEmployeeImg}${data.id}`)
     }

  imageToShow: any;

  get f() { return this.employeeProfile.controls; }

  ngOnInit() {
    var validators = {};
    EmployeeProfileColumnsDesc.forEach(v => {
      if(!validators.hasOwnProperty(v.name)){
        validators[v.name] = v.validators;
      }
    });
    this.employeeProfile = this.formBuilder.group(validators);
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

  onSubmit(){
    if(this.employeeProfile.invalid)
      return;
    var emp = this.employeeProfile.value;
    emp.companyId = this.data.companyId;
    emp.id = this.data.id;
    emp.dateOfJoining = addDaysFromDate(emp.dateOfJoining, 0);
    emp.isActive = this.isActive;
    if(!emp.dateOfRelieving && !this.isActive ){
      emp.dateOfRelieving = addDaysFromDate(new Date(),0);
    }
    this.employeeServices.updateEmployeeProfile(emp).pipe().subscribe(
      data => {
        console.log(data);
          this.router.navigate(['/employees']);
      },
      error => {
        console.log(error);
      });

  }

  changeActive(){
    (this.isActive) ? this.isActive = false : this.isActive = true;
    console.log(this.isActive);
  }

  onNoClick(){

  }

  getErrorMessage() {
    return 'Required field / Contains Error' ;
  }

}
