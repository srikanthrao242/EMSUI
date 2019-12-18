import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {columnsDesc, ColumnsSchema, Company} from './CompaniesUtil'

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})
export class CompaniesComponent implements OnInit {

  constructor() { }

  columns : ColumnsSchema[]

  displayedColumns: string[] = ['id','companyname','address','city','mobile','email','registerdate','registrationexp'];
  dataSource = new MatTableDataSource<Company>(ELEMENT_DATA);

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit() {
    this.columns = columnsDesc
    this.dataSource.paginator = this.paginator;
  }

}

const ELEMENT_DATA : Company[] = [
  {id: 1,companyname:"ems",address:"Hyd",city: "HYd",
  mobile:"9676762142",email:"avc@gmail.com",registerdate:new Date("2019-12-15 19:34:57"),registrationexp:null},
{id: 3,companyname:"ems2",address:"HYD",city:"HYD",
mobile:"9676762142",email:"srikanthraomca@yahoo.com",registerdate: new Date("2019-12-15 20:12:11"),registrationexp: null}
]
