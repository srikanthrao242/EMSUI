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

import { FlexLayoutModule } from "@angular/flex-layout";
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { MatToolbarModule } from '@angular/material/toolbar';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AlertcComponent } from './alertc/alertc.component';
import { UserComponent } from './user/user.component';
import { EmployeeComponent } from './employee/employee.component';
import { ProfileComponent } from './employee/profile/profile.component';
import { ContextmenuComponent } from './employee/contextmenu/contextmenu.component';
import { ProfileEditComponent } from './employee/profile/profile-edit/profile-edit.component';
import { SalaryEditComponent } from './employee/profile/salary-edit/salary-edit.component';
import { BankEditComponent } from './employee/profile/bank-edit/bank-edit.component';

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
    AlertcComponent,
    UserComponent,
    EmployeeComponent,
    ProfileComponent,
    ContextmenuComponent,
    ProfileEditComponent,
    SalaryEditComponent,
    BankEditComponent
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
    MatDatepickerModule
  ],
  providers: [],
  bootstrap: [
    AppComponent,
    MenusComponent,
    CompaniesComponent,
    AddComponent,
    DeleteComponent,
    EditComponent,
    LoginComponent,
    RegisterComponent,
    AlertcComponent,
    ContextmenuComponent,
    ProfileEditComponent,
    SalaryEditComponent,
    BankEditComponent
  ]
})
export class AppModule { }



platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
