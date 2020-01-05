import { Component, ElementRef, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogConfig, MatDialogRef, MatDialog } from '@angular/material';

import { EmployeeService } from '../employee.service';
import { ProfileEditComponent } from '../profile/profile-edit/profile-edit.component';
import { SalaryEditComponent } from '../profile/salary-edit/salary-edit.component';
import { BankEditComponent } from '../profile/bank-edit/bank-edit.component';

@Component({
  selector: 'app-contextmenu',
  templateUrl: './contextmenu.component.html',
  styleUrls: ['./contextmenu.component.css']
})
export class ContextmenuComponent implements OnInit{

  private readonly _matDialogRef: MatDialogRef<ContextmenuComponent>;
  private readonly triggerElementRef: ElementRef;
  private employeeServices:EmployeeService;
  private employeeId: number;
  constructor(_matDialogRef: MatDialogRef<ContextmenuComponent>,
              @Inject(MAT_DIALOG_DATA) data: { trigger: ElementRef , empId: number},
              employeeServices: EmployeeService,
              public dialog: MatDialog) {
    this._matDialogRef = _matDialogRef;
    this.triggerElementRef = data.trigger;
    this.employeeId = data.empId;
    this.employeeServices = employeeServices;
  }

  ngOnInit() {
    const matDialogConfig: MatDialogConfig = new MatDialogConfig();
    const rect = this.triggerElementRef.nativeElement.getBoundingClientRect();
    matDialogConfig.position = { left: `${rect.left - 50}px`, top: `${rect.bottom - 50}px` };
    matDialogConfig.width = '150px';
    matDialogConfig.height = '150px';
    this._matDialogRef.updateSize(matDialogConfig.width, matDialogConfig.height);
    this._matDialogRef.updatePosition(matDialogConfig.position);
  }
  cancel(): void {
    this._matDialogRef.close(null);
  }

  editProfile() {
    this._matDialogRef.close(null);
    this.employeeServices.getEmployeeProfile(this.employeeId)
    .pipe()
    .subscribe(
        d => {
          this.dialog.open(ProfileEditComponent, {data: d});
        },
        error => {
          console.log(error);
        });

  }

  editSalary() {
    this._matDialogRef.close(null);
    this.employeeServices.getSalaryByEmpId(this.employeeId)
    .pipe()
    .subscribe(
        d => {
          this.dialog.open(SalaryEditComponent, {data: d});
        },
        error => {
          console.log(error);
        });
  }

  editBankDetails(){
    this._matDialogRef.close(null);
    this.employeeServices.getBankDetailsByEmpId(this.employeeId)
    .pipe()
    .subscribe(
        d => {
          this.dialog.open(BankEditComponent, {data: d});
        },
        error => {
          console.log(error);
        });
  }

}
