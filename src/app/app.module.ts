import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatNativeDateModule} from '@angular/material/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenusComponent } from './menus/menus.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { CompaniesComponent } from './companies/companies.component';
import {HttpClientModule} from '@angular/common/http';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule, MatSelectModule} from '@angular/material';
import { AddComponent } from './dialogs/add/add.component';
import { DeleteComponent } from './dialogs/delete/delete.component';
import { EditComponent } from './dialogs/edit/edit.component';

import {MatTabsModule} from '@angular/material/tabs';
import {MatGridListModule} from '@angular/material';
import {MatCardModule} from '@angular/material/card';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { MatToolbarModule } from '@angular/material/toolbar';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserComponent } from './user/user.component';
import { EmployeeComponent } from './employee/employee.component';
import { ProfileComponent } from './employee/profile/profile.component';
import { ContextmenuComponent } from './employee/contextmenu/contextmenu.component';
import { ProfileEditComponent } from './employee/profile/profile-edit/profile-edit.component';
import { SalaryEditComponent } from './employee/profile/salary-edit/salary-edit.component';
import { BankEditComponent } from './employee/profile/bank-edit/bank-edit.component';
import { StudentWizardComponent } from './student-wizard/student-wizard.component';
import { AcademicComponent } from './academic/academic.component';
import { StudentClassesComponent } from './student-classes/student-classes.component';
import { NotificationComponent } from './toastr-notification/toastr-notification.component';
import { NotificationService } from './toastr-notification/toastr-notification.service';
import { AcademicListComponent } from './academic-list/academic-list.component';

@NgModule({
  declarations: [
    AppComponent,
    MenusComponent,
    CompaniesComponent,
    AddComponent,
    DeleteComponent,
    EditComponent,
    LoginComponent,
    RegisterComponent,
    UserComponent,
    EmployeeComponent,
    ProfileComponent,
    ContextmenuComponent,
    ProfileEditComponent,
    SalaryEditComponent,
    BankEditComponent,
    StudentWizardComponent,
    AcademicComponent,
    StudentClassesComponent,
    NotificationComponent,
    AcademicListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatMenuModule,
    ReactiveFormsModule,
    FormsModule,
    MatNativeDateModule,
    MatButtonModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatSortModule,
    MatToolbarModule,
    MatGridListModule,
    MatTabsModule,
    MatCardModule,
    FlexLayoutModule,
    MatSelectModule,
    MatDatepickerModule,
    MatSlideToggleModule,
    CommonModule
  ],
  providers: [NotificationService],
  bootstrap: [
    AppComponent,
    MenusComponent,
    CompaniesComponent,
    AddComponent,
    DeleteComponent,
    EditComponent,
    LoginComponent,
    RegisterComponent,
    ContextmenuComponent,
    ProfileEditComponent,
    SalaryEditComponent,
    BankEditComponent
  ],
  exports: [
    NotificationComponent
  ]
})
export class AppModule { }



platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
