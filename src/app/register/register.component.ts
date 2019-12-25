import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import {AuthenticationService} from '../auth/authentication.service';
import {AlertService} from '../alert/alert.service';
import {FormControl, FormGroupDirective, NgForm} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {Company, ColumnsSchema, columnsDesc} from '../companies/CompaniesUtil';
import {UserColumnsDesc, UserColumnsSchema} from '../models/user';
import {UserService} from '../user/user.service';

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
  url_profile = '';
  url_cl='';
  unUsedColForCompany = ['id','isActive','registerdate','registrationexp'];

  constructor(
      private formBuilder: FormBuilder,
      private router: Router,
      private authenticationService: AuthenticationService,
      private userService: UserService,
      private alertService: AlertService
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
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        if(fromPCL === "profile"){
          this.url_profile = event.target["result"];
        }else{
          this.url_cl = event.target["result"];
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
      this.loading = true;
      this.userService.register(this.registerForm.value)
          .pipe(first())
          .subscribe(
              data => {
                  this.alertService.success('Registration successful', true);
                  this.router.navigate(['/login']);
              },
              error => {
                  this.alertService.error(error);
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
