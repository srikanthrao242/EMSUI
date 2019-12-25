import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompaniesComponent } from './companies/companies.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {AuthGuardService} from './helpers/auth-guard.service';

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' , canActivate: [AuthGuardService]},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent, canActivate: [AuthGuardService] },
  { path: 'companies', component: CompaniesComponent , canActivate: [AuthGuardService]},

  // otherwise redirect to home
  { path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
