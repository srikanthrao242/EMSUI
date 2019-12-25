import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../auth/authentication.service';

@Component({
  selector: 'app-menus',
  templateUrl: './menus.component.html',
  styleUrls: ['./menus.component.css']
})
export class MenusComponent implements OnInit {

  loginFlag = false;

  constructor(
    private authenticationService: AuthenticationService) {

      if(authenticationService.currentUserValue){
        this.loginFlag = false;
      }else{
        this.loginFlag = true;
      }

     }

  ngOnInit() {
  }

  logout(){
    this.loginFlag = false;
    this.authenticationService.logout();
  }

}
