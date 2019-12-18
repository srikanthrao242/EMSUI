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

@NgModule({
  declarations: [
    AppComponent,
    MenusComponent,
    CompaniesComponent
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
    MatPaginatorModule
  ],
  providers: [],
  bootstrap: [
    AppComponent,
    MenusComponent,
    CompaniesComponent
  ]
})
export class AppModule { }



platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
