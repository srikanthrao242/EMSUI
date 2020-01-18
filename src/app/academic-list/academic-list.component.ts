import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Academic,AcademicColumnsDesc, AcademicColumnsSchema, displayedColumns } from '../models/academics';
import { AcademicService } from '../academic/academic.service';
import { MatSort } from '@angular/material/sort';
import {DataSource} from '@angular/cdk/collections';
import {BehaviorSubject, fromEvent, merge, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-academic-list',
  templateUrl: './academic-list.component.html',
  styleUrls: ['./academic-list.component.css']
})
export class AcademicListComponent implements OnInit {

  constructor(public httpClient: HttpClient) { }

  AcademicDatabase: AcademicService | null;
  dataSource: AcademicDataSource | null;

  columns : AcademicColumnsSchema[]
  displayedColumns : string[]

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild('filter',  {static: true}) filter: ElementRef;

  ngOnInit() {
    this.columns = AcademicColumnsDesc
    this.displayedColumns = displayedColumns
    this.loadData();
  }

  refresh() {
    this.loadData();
  }

  isActive(id:number, v:boolean):void{
    if(v) {
      v = false ;
    }else{ v = true;}

  }

  public loadData() {
    this.AcademicDatabase = new AcademicService(this.httpClient);
    this.dataSource = new AcademicDataSource(this.AcademicDatabase, this.paginator, this.sort);
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


export class AcademicDataSource extends DataSource<Academic> {
  _filterChange = new BehaviorSubject('');

  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  filteredData: Academic[] = [];
  renderedData: Academic[] = [];

  constructor(public _exampleDatabase: AcademicService,
              public _paginator: MatPaginator,
              public _sort: MatSort) {
    super();
    // Reset to the first page when the user changes the filter.
    this._filterChange.subscribe(() => this._paginator.pageIndex = 0);
  }

  isSearchMatch(issue:Academic):boolean{
    const searchStr = (issue.AcademicID + issue.AcademicName + issue.EndYear + issue.IsActive + issue.IsCurrentAcademic).toLowerCase();
    return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Academic[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this._exampleDatabase.dataChange,
      this._sort.sortChange,
      this._filterChange,
      this._paginator.page
    ];
    this._exampleDatabase.getAllAcademicDetails();


    return merge(...displayDataChanges).pipe(map( () => {
        // Filter data
        this.filteredData = this._exampleDatabase.data.slice().filter((issue: Academic) => {
          return (issue && issue.AcademicID && this.isSearchMatch(issue));
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
  sortData(data: Academic[]): Academic[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';

      switch (this._sort.active) {
        case 'AcademicID': [propertyA, propertyB] = [a.AcademicID, b.AcademicID]; break;
        case 'AcademicName': [propertyA, propertyB] = [a.AcademicName, b.AcademicName]; break;
        case 'EndYear': [propertyA, propertyB] = [a.EndYear, b.EndYear]; break;
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
    });
  }
}

