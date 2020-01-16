import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {DataSource} from '@angular/cdk/collections';
import {columnsDesc, ColumnsSchema, Company} from './CompaniesUtil'
import { CompanyService } from './company.service';
import {BehaviorSubject, fromEvent, merge, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import {map} from 'rxjs/operators';
import {AddComponent} from '../dialogs/add/add.component';
import {DeleteComponent} from '../dialogs/delete/delete.component';
import {EditComponent} from '../dialogs/edit/edit.component';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})
export class CompaniesComponent implements OnInit {

  constructor(public httpClient: HttpClient,
    public dialog: MatDialog) { }

  companyDatabase: CompanyService | null;
  dataSource: ComapnyDataSource | null;
  index: number;
  id: number;

  columns : ColumnsSchema[]

  displayedColumns: string[] = ['id','companyname','address','city','mobile','email','registerdate','registrationexp','whatsup','actions'];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild('filter',  {static: true}) filter: ElementRef;

  ngOnInit() {
    this.columns = columnsDesc
    this.loadData();
  }

  refresh() {
    this.loadData();
  }

  isActive(id:number, v:boolean):void{
    if(v) {
      v = false ;
    }else{ v = true;}
    this.companyDatabase.activateOrDeactivate(id,v)
    .pipe()
    .subscribe(
        data => {
            console.log(data);
        },
        error => {
          console.log(error)
        });
  }

  public loadData() {
    this.companyDatabase = new CompanyService(this.httpClient);
    this.dataSource = new ComapnyDataSource(this.companyDatabase, this.paginator, this.sort);
    fromEvent(this.filter.nativeElement, 'keyup')
      // .debounceTime(150)
      // .distinctUntilChanged()
      .subscribe(() => {
        if (!this.dataSource) {
          return;
        }
        this.dataSource.filter = this.filter.nativeElement.value;
      });
  }


  addNew(issue: Company) {
    const dialogRef = this.dialog.open(AddComponent, {
      data: {kind:'Company'}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        // After dialog is closed we're doing frontend updates
        // For add we're just pushing a new row inside DataService
        this.companyDatabase.dataChange.value.push(this.companyDatabase.getDialogData());
        this.refreshTable();
      }
    });
  }

  addDays(dst: string, days: number) : string {
    const d = new Date(dst);
    return new Date(d.setDate(d.getDate() + days)).toISOString().replace("T"," ").replace("Z","");
  }

  startEdit(i: number,
     id : number,
    companyname:string,
    address:String,
    city: string,
    mobile: string,
    email: string,
    numberofdays: number,
    registerdate: string,
    whatsup: string) {
    this.id = id;
    // index row is used just for debugging proposes and can be removed
    this.index = i;
    const dialogRef = this.dialog.open(EditComponent, {
      data: {kind:'Company',id: id, companyname: companyname, address: address,
        city: city, mobile: mobile, email: email, numberofdays: numberofdays, whatsup: whatsup, registrationexp: this.addDays(registerdate, numberofdays)}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        // When using an edit things are little different, firstly we find record inside DataService by id
        const foundIndex = this.companyDatabase.dataChange.value.findIndex(x => x.id === this.id);
        // Then you update that record using data from dialogData (values you enetered)
        this.companyDatabase.dataChange.value[foundIndex] = this.companyDatabase.getDialogData();
        // And lastly refresh table
        this.refreshTable();
      }
    });
  }

  deleteItem(i: number,
    id : number,
    companyname:string,
    city: string,
    mobile: string) {
    this.index = i;
    this.id = id;
    const dialogRef = this.dialog.open(DeleteComponent, {
      data: {kind:'Company', id: id, companyname: companyname, city: city, mobile: mobile}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        const foundIndex = this.companyDatabase.dataChange.value.findIndex(x => x.id === this.id);
        // for delete we use splice in order to remove single object from DataService
        this.companyDatabase.dataChange.value.splice(foundIndex, 1);
        this.refreshTable();
      }
    });
  }

  private refreshTable() {
    // Refreshing table using paginator
    // Thanks yeager-j for tips
    this.paginator._changePageSize(this.paginator.pageSize);
  }

}


export class ComapnyDataSource extends DataSource<Company> {
  _filterChange = new BehaviorSubject('');

  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  filteredData: Company[] = [];
  renderedData: Company[] = [];

  constructor(public _exampleDatabase: CompanyService,
              public _paginator: MatPaginator,
              public _sort: MatSort) {
    super();
    // Reset to the first page when the user changes the filter.
    this._filterChange.subscribe(() => this._paginator.pageIndex = 0);
  }

  isSearchMatch(issue:Company):boolean{
    const searchStr = (issue.id + issue.companyname + issue.city + issue.email).toLowerCase();
    return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Company[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this._exampleDatabase.dataChange,
      this._sort.sortChange,
      this._filterChange,
      this._paginator.page
    ];

    this._exampleDatabase.getCompanies();

    return merge(...displayDataChanges).pipe(map( () => {
        // Filter data
        this.filteredData = this._exampleDatabase.data.slice().filter((issue: Company) => {
          return (issue && issue.id && this.isSearchMatch(issue));
        });

        // Sort filtered data
        const sortedData = this.sortData(this.filteredData.slice());

        // Grab the page's slice of the filtered sorted data.
        const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
        this.renderedData = sortedData.splice(startIndex, this._paginator.pageSize);
        return this.renderedData;
      }
    ));
  }

  disconnect() {}


  /** Returns a sorted copy of the database data. */
  sortData(data: Company[]): Company[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';

      switch (this._sort.active) {
        case 'id': [propertyA, propertyB] = [a.id, b.id]; break;
        case 'companyname': [propertyA, propertyB] = [a.companyname, b.companyname]; break;
        case 'city': [propertyA, propertyB] = [a.city, b.city]; break;
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
    });
  }
}
