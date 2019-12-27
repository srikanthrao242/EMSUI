import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {Component, Inject, OnInit} from '@angular/core';
import { CompanyService } from 'src/app/companies/company.service';
import { Company } from 'src/app/companies/CompaniesUtil';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public cmpDataService: CompanyService,
    public  userDataService : UserService) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmDelete(): void {
    switch (this.data.kind){
      case "Company" : this.cmpDataService.deleteCompany(this.data.id);
      break;
      case "User" : this.userDataService.deleteUser(this.data.id);
      break;
    }
  }

  ngOnInit() {
  }

}
