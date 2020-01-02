import { Component, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material';

import {EmpSalBank} from '../../models/employees';

@Component({
  selector: 'app-contextmenu',
  templateUrl: './contextmenu.component.html',
  styleUrls: ['./contextmenu.component.css']
})
export class ContextmenuComponent {

  constructor(items:EmpSalBank) { }


  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;

  contextMenuPosition = { x: '0px', y: '0px' };

  onClick(event: MouseEvent, item: EmpSalBank) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + 'px';
    this.contextMenuPosition.y = event.clientY + 'px';
   // this.contextMenu.menuData = { 'item': item };
    this.contextMenu.menu.focusFirstItem('mouse');
    this.contextMenu.openMenu();
  }

  editProfile(item: EmpSalBank) {

  }

  editSalary(item: EmpSalBank) {

  }

  editBankDetails(item: EmpSalBank){

  }

}
