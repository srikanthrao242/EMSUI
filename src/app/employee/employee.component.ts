import {Employee, displayedColumns, EmployeeColumnsSchema, EmployeeColumnsDesc} from '../models/employees';
import { HttpClient } from '@angular/common/http';
import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {DataSource} from '@angular/cdk/collections';
import {BehaviorSubject, fromEvent, merge, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import { EmployeeService } from './employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  constructor(public httpClient: HttpClient) { }

  employeeDatabase: EmployeeService | null;
  dataSource: EmployeeDataSource | null;
  index: number;
  id: number;

  columns : EmployeeColumnsSchema[]

  displayColumns: string[];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild('filter',  {static: true}) filter: ElementRef;

  ngOnInit() {
    this.columns = EmployeeColumnsDesc
    this.displayColumns = displayedColumns;
    this.loadData();
  }

  refresh() {
    this.loadData();
  }

  public loadData() {
    this.employeeDatabase = new EmployeeService(this.httpClient);
    this.dataSource = new EmployeeDataSource(this.employeeDatabase, this.paginator, this.sort);
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

}



export class EmployeeDataSource extends DataSource<Employee> {
  _filterChange = new BehaviorSubject('');

  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  filteredData: Employee[] = [];
  renderedData: Employee[] = [];

  constructor(public _exampleDatabase: EmployeeService,
              public _paginator: MatPaginator,
              public _sort: MatSort) {
    super();
    // Reset to the first page when the user changes the filter.
    this._filterChange.subscribe(() => this._paginator.pageIndex = 0);
  }

  isSearchMatch(issue:Employee):boolean{
    const searchStr = (issue.id + issue.firstName + issue.city + issue.email).toLowerCase();
    return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Employee[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this._exampleDatabase.dataChange,
      this._sort.sortChange,
      this._filterChange,
      this._paginator.page
    ];

    this._exampleDatabase.getEmployees();

    return merge(...displayDataChanges).pipe(map( () => {
        // Filter data
        this.filteredData = this._exampleDatabase.data.slice().filter((issue: Employee) => {
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
  sortData(data: Employee[]): Employee[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';

      switch (this._sort.active) {
        case 'id': [propertyA, propertyB] = [a.id, b.id]; break;
        case 'firstName': [propertyA, propertyB] = [a.firstName, b.firstName]; break;
        case 'city': [propertyA, propertyB] = [a.city, b.city]; break;
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
    });
  }
}
