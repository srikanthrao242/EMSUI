import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import {AuthenticationService} from '../auth/authentication.service';
import {FormControl, FormGroupDirective, NgForm} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {Company, ColumnsSchema, columnsDesc} from '../companies/CompaniesUtil';
import {UserColumnsDesc, UserColumnsSchema} from '../models/user';
import {UserService} from '../user/user.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  loading = false;
  submitted = false;
  companycolumnsDesc: ColumnsSchema[];
  userColumnsDesc : UserColumnsSchema[];
  url_profile = '../../assets/images/icons8-user-male-skin-type-5-50.png';
  url_cl='../../assets/images/icons8-apple-logo-50.png';
  unUsedColForCompany = ['id','isActive','registerdate','registrationexp'];
  userProfileImage = '';
  companyLogo = '';

  constructor(
      private formBuilder: FormBuilder,
      private router: Router,
      private authenticationService: AuthenticationService,
      private userService: UserService
  ) {
      // redirect to home if already logged in
      if (this.authenticationService.currentUserValue) {
          this.router.navigate(['/']);
      }
      this.companycolumnsDesc = columnsDesc.filter(v=>this.unUsedColForCompany.indexOf(v.name) == -1)
      this.userColumnsDesc = UserColumnsDesc.filter(v=> v && v.name !== 'id');
  }

  onSelectFile(event, fromPCL) {
    if (event.target.files && event.target.files[0]) {
      var filePath = event.target.files[0]; // read file as data url

      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
         if(fromPCL === "profile"){
          this.userService.loadImage("profile", filePath)
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
        }else{
          this.userService.loadImage("cl", filePath)
            .subscribe(
                data => {
                  if(data instanceof HttpResponse){
                    console.log("successfully loaded file", data);
                    this.companyLogo = (<HttpResponse<any>>data).body.fileName;
                    this.url_cl = event.target["result"];
                  }
                },
                error => {
                  console.log(error);
                });
        }
      }


    }
  }

  ngOnInit() {
    var validators = {};
    this.userColumnsDesc.forEach(v => {
      if(!validators.hasOwnProperty(v.name)){
        validators[v.name] = v.validators;
      }
    })
    this.companycolumnsDesc.forEach(v=>{
      if(!validators.hasOwnProperty(v.name)){
        validators[v.name] = v.validators;
      }
    });
    this.registerForm = this.formBuilder.group(validators);
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      if (this.registerForm.invalid) {
          return;
      }
      this.registerForm.value.profileimg = this.userProfileImage;
      this.registerForm.value.comapnylogo = this.companyLogo;
      this.loading = true;
      this.userService.register(this.registerForm.value)
          .pipe(first())
          .subscribe(
              data => {
                  this.router.navigate(['/login']);
              },
              error => {
                  this.loading = false;
              });
  }
}


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
