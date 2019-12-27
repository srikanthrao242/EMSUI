import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { addCompany} from '../../companies/CompaniesUtil'
import {CompanyService} from '../../companies/company.service'
import { addUser } from 'src/app/models/user';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  headline = null
  columns = null

  constructor(public dialogRef: MatDialogRef<EditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public cmpDataService: CompanyService,
    public  userDataService : UserService) {
      switch (this.data.kind){
        case "Company" :
           this.headline = "Company";
           this.columns = addCompany;
        break;
        case "User" :
            this.headline = "User";
            this.columns = addUser;
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

    stopEdit(): void {
      switch (this.data.kind){
        case "Company" : this.cmpDataService.updateCompany(this.data);
        break;
        case "User" : this.userDataService.updateUser(this.data);
        break;
      }
    }

  ngOnInit() {
  }

}
