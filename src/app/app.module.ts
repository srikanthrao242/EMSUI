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
import {MatPaginatorModule} from '@angular/material';
import { AddComponent } from './dialogs/add/add.component';
import { DeleteComponent } from './dialogs/delete/delete.component';
import { EditComponent } from './dialogs/edit/edit.component';

import {MatGridListModule} from '@angular/material'

import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { MatToolbarModule } from '@angular/material/toolbar';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AlertcComponent } from './alertc/alertc.component';
import { UserComponent } from './user/user.component';

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
    UserComponent
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
    MatGridListModule
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
    AlertcComponent
  ]
})
export class AppModule { }



platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
