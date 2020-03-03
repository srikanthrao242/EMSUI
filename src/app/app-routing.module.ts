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
import { ListClassesComponent } from './student-classes/list-classes/list-classes.component';
import { StudentAdmissionComponent } from './student-admission/student-admission.component';
import { StudentListComponent } from './student-list/student-list.component';
import { StudentEditComponent } from './student-edit/student-edit.component';
import { StudentExaminationsComponent } from './student-examinations/student-examinations.component';
import { AddExamsComponent } from './add-exams/add-exams.component';
import { AddExamSubjectsComponent } from './add-exam-subjects/add-exam-subjects.component';

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
  { path: 'classes-sections-list', component: ListClassesComponent , canActivate: [AuthGuardService]},
  { path: 'new-admission', component: StudentAdmissionComponent , canActivate: [AuthGuardService]},
  { path: 'student-list', component: StudentListComponent , canActivate: [AuthGuardService]},
  { path: 'student-edit', component: StudentEditComponent , canActivate: [AuthGuardService]},
  { path: 'student-exams', component: StudentExaminationsComponent , canActivate: [AuthGuardService]},
  { path: 'add-new-exam', component: AddExamsComponent , canActivate: [AuthGuardService]},
  { path: 'add-exam-subs', component: AddExamSubjectsComponent , canActivate: [AuthGuardService]},


  // otherwise redirect to home
  { path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
