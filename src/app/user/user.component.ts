import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import {User, UserColumnsDesc, UserColumnsSchema} from '../models/user';
import { UserService } from './user.service';
import {MatPaginator} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {DataSource} from '@angular/cdk/collections';
import {BehaviorSubject, fromEvent, merge, Observable} from 'rxjs';
import { map } from 'rxjs/internal/operators/map';
import { AddComponent } from '../dialogs/add/add.component';
import { DeleteComponent } from '../dialogs/delete/delete.component';
import { EditComponent } from '../dialogs/edit/edit.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(private httpClient: HttpClient, private dialog: MatDialog) { }


  userDatabase: UserService | null;
  dataSource: UserDataSource | null;
  index: number;
  id: number;

  columns : UserColumnsSchema[]

  displayedColumns: string[] = ['id','name','address','city','mobile','email','registerdate','registrationexp','whatsup','isActive','actions'];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild('filter',  {static: true}) filter: ElementRef;

  ngOnInit() {
    this.columns = UserColumnsDesc
    this.loadData();
  }

  refresh() {
    this.loadData();
  }

  public loadData() {
    this.userDatabase = new UserService(this.httpClient);
    this.dataSource = new UserDataSource(this.userDatabase, this.paginator, this.sort);
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


  addNew(issue: User) {
    const dialogRef = this.dialog.open(AddComponent, {
      data: {kind:'User'} as User
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        // After dialog is closed we're doing frontend updates
        // For add we're just pushing a new row inside DataService
        this.userDatabase.dataChange.value.push(this.userDatabase.getDialogData());
        this.refreshTable();
      }
    });
  }


  startEdit(i: number,
    id : number,
   name:string,
   address:String,
   city: string,
   mobile: string,
   email: string,
   whatsup: string) {
   this.id = id;
   // index row is used just for debugging proposes and can be removed
   this.index = i;
   const dialogRef = this.dialog.open(EditComponent, {
     data: {kind:'User',id: id, name: name, address: address,
       city: city, mobile: mobile, email: email,whatsup: whatsup}
   });

   dialogRef.afterClosed().subscribe(result => {
     if (result === 1) {
       // When using an edit things are little different, firstly we find record inside DataService by id
       const foundIndex = this.userDatabase.dataChange.value.findIndex(x => x.id === this.id);
       // Then you update that record using data from dialogData (values you enetered)
       this.userDatabase.dataChange.value[foundIndex] = this.userDatabase.getDialogData();
       // And lastly refresh table
       this.refreshTable();
     }
   });
 }

  deleteItem(i: number,
    id : number) {
    this.index = i;
    this.id = id;
    const dialogRef = this.dialog.open(DeleteComponent, {
      data: {kind:'User', id: id}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        const foundIndex = this.userDatabase.dataChange.value.findIndex(x => x.id === this.id);
        // for delete we use splice in order to remove single object from DataService
        this.userDatabase.dataChange.value.splice(foundIndex, 1);
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


export class UserDataSource extends DataSource<User> {
  _filterChange = new BehaviorSubject('');

  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  filteredData: User[] = [];
  renderedData: User[] = [];

  constructor(public _exampleDatabase: UserService,
              public _paginator: MatPaginator,
              public _sort: MatSort) {
    super();
    // Reset to the first page when the user changes the filter.
    this._filterChange.subscribe(() => this._paginator.pageIndex = 0);
  }

  isSearchMatch(issue:User):boolean{
    const searchStr = (issue.id + issue.name + issue.city + issue.email).toLowerCase();
    return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<User[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this._exampleDatabase.dataChange,
      this._sort.sortChange,
      this._filterChange,
      this._paginator.page
    ];

    this._exampleDatabase.getUsers();

    return merge(...displayDataChanges).pipe(map( () => {
        // Filter data
        this.filteredData = this._exampleDatabase.data.slice().filter((issue: User) => {
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
  sortData(data: User[]): User[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';

      switch (this._sort.active) {
        case 'id': [propertyA, propertyB] = [a.id, b.id]; break;
        case 'name': [propertyA, propertyB] = [a.name, b.name]; break;
        case 'city': [propertyA, propertyB] = [a.city, b.city]; break;
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
    });
  }
}

