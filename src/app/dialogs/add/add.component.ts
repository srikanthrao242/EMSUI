import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {FormControl, Validators} from '@angular/forms';
import { addCompany} from '../../companies/CompaniesUtil'
import {CompanyService} from '../../companies/company.service'
import { addUser } from 'src/app/models/user';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})

export class AddComponent implements OnInit {


  addTitle = null
  columns = null
    constructor(public dialogRef: MatDialogRef<AddComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        public cmpDataService: CompanyService,
        public  userDataService : UserService) {
          console.log(data)
          switch (this.data.kind){
            case "Company" :
               this.columns = addCompany;
               this.addTitle = "Add New Company";
            break;
            case "User" :
                this.columns = addUser;
                this.addTitle = "Add New User";
            break;
          }

         }

    formControl = new FormControl('', [
    Validators.required
    // Validators.email,
    ]);

    getErrorMessage() {
    return this.formControl.hasError('required') ? 'Required field' :
    this.formControl.hasError('email') ? 'Not a valid email' :
    '';
    }

    submit() {
    // emppty stuff
    }

    onNoClick(): void {
    this.dialogRef.close();
    }

    public confirmAdd(): void {
      switch (this.data.kind){
        case "Company" : this.cmpDataService.addCompany(this.data);
        break;
        case "User" : this.userDataService.addUser(this.data);
        break;
      }
    }

    ngOnInit() {

    }


}
