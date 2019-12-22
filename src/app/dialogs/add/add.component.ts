import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {FormControl, Validators} from '@angular/forms';
import {Company} from '../../companies/CompaniesUtil'
import {CompanyService} from '../../companies/company.service'

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})

export class AddComponent implements OnInit {


    constructor(public dialogRef: MatDialogRef<AddComponent>,
        @Inject(MAT_DIALOG_DATA) public data: Company,
        public dataService: CompanyService) {
          console.log(data)
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
    this.dataService.addCompany(this.data);
    }

    ngOnInit() {

    }


}
