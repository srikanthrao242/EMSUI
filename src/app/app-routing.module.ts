import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompaniesComponent } from './companies/companies.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {AuthGuardService} from './helpers/auth-guard.service';
import {UserComponent} from './user/user.component'
import { EmployeeComponent } from './employee/employee.component';
import { ProfileComponent } from './employee/profile/profile.component';
import {StudentWizardComponent} from './student-wizard/student-wizard.component';
import {AcademicComponent} from './academic/academic.component';
import { StudentClassesComponent } from './student-classes/student-classes.component';
import { AcademicListComponent } from './academic-list/academic-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' , canActivate: [AuthGuardService]},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent},
  { path: 'companies', component: CompaniesComponent , canActivate: [AuthGuardService]},
  { path: 'user', component: UserComponent , canActivate: [AuthGuardService]},
  { path: 'employees', component: EmployeeComponent , canActivate: [AuthGuardService]},
  { path: 'profile', component: ProfileComponent , canActivate: [AuthGuardService]},
  { path: 'studentWizard', component: StudentWizardComponent , canActivate: [AuthGuardService]},
  { path: 'academic', component: AcademicComponent , canActivate: [AuthGuardService]},
  { path: 'classes', component: StudentClassesComponent , canActivate: [AuthGuardService]},
  { path: 'academic-list', component: AcademicListComponent , canActivate: [AuthGuardService]},

  // otherwise redirect to home
  { path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
