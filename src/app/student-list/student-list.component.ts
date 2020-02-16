import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {DataSource} from '@angular/cdk/collections';
import {BehaviorSubject, fromEvent, merge, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import {map} from 'rxjs/operators';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AcademicService } from '../academic/academic.service';
import { Academic } from '../models/academics';
import { Classes, ClassSections } from '../models/classesAndSections';
import { StudentClassService } from '../student-classes/student-class.service';
import StudentDetails, {dataForm, columnsDesc} from '../models/students';
import { Router } from '@angular/router';
import { ColumnsSchema } from '../companies/CompaniesUtil';
import { EmsUtilService } from '../emlsUtil/ems-util.service';
import { NotificationService } from '../toastr-notification/toastr-notification.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {

  academicsNames : Academic[];
  dataForm:FormGroup;
  selectedAcademic:string;
  selectedClass:string;
  selectedSection:string;
  classes : Classes[];
  sections: ClassSections[];
  imageToShow = '../../assets/images/icons8-user-male-skin-type-5-50.png';
  isImageLoading = false;
  studentProfileImage:string;
  columns : ColumnsSchema[];
  displayTable = false;

  constructor(
    private formBuilder: FormBuilder,
    private academicService: AcademicService,
    private studentClassService: StudentClassService,
    public httpClient: HttpClient,
    public dialog: MatDialog,
    private router: Router,
    public emsUtilService: EmsUtilService,
    public notificationServices: NotificationService) { }


  studentDatabase: StudentClassService
  dataSource: StudentDataSource | null;
  index: number;
  id: number;

  displayedColumns: string[] = ['StudentID','ProfileImage', 'FirstName', 'LastName', 'DOB', 'BloodGroup', 'Gender', 'Active', 'Edit'];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild('filter',  {static: true}) filter: ElementRef;

  ngOnInit() {
    this.academicService.getAllAcademicNames().subscribe(
      data => {
        this.academicsNames = data;
        this.columns = columnsDesc;
        this.loadData();
      },
      error => console.error('There was an error!', error)
    );
    this.dataForm = this.formBuilder.group(dataForm);
  }
  get f() { return this.dataForm.controls; }

  onChangeAcademic(){
    this.studentClassService.getClasses(+this.f.selectedAcademic.value).subscribe(
      data => this.classes = data,
      error => console.error('There was an error!', error)
    );
  }

  onChangeClass(){
    this.studentClassService.getSections(+this.f.selectedClass.value).subscribe(
      data => this.sections = data,
      error => console.error('There was an error!', error)
    );
  }

  refresh() {
    this.loadData();
  }

  loadData() {
    //if(this.f.selectedAcademic.value && this.f.selectedClass.value  && this.f.selectedSection.value ){
      var req = {'academicID': +this.f.selectedAcademic.value,
      'classID':+this.f.selectedClass.value, 'sectionID' : +this.f.selectedSection.value};
      this.studentDatabase = new StudentClassService(this.httpClient,this.router, this.emsUtilService, this.notificationServices);
      this.dataSource = new StudentDataSource(this.studentDatabase, this.paginator, this.sort, req);
      fromEvent(this.filter.nativeElement, 'keyup')
        .subscribe(() => {
          if (!this.dataSource) {
            return;
          }
          this.dataSource.filter = this.filter.nativeElement.value;
        });
    //}
  }

  getStudentList(){
    this.displayTable = true;
    this.loadData();
  }

  editStudent(i:number, row:StudentDetails){
    this.studentClassService.getParentDetails(+ row.StudentID).subscribe(data=>{
      this.router.navigate(['/student-edit'], { queryParams: Object.assign(data,row) });
    })
  }

}



export class StudentDataSource extends DataSource<StudentDetails> {
  _filterChange = new BehaviorSubject('');

  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  filteredData: StudentDetails[] = [];
  renderedData: StudentDetails[] = [];

  constructor(public _exampleDatabase: StudentClassService,
              public _paginator: MatPaginator,
              public _sort: MatSort,
              public _req: any) {
    super();
    // Reset to the first page when the user changes the filter.
    this._filterChange.subscribe(() => this._paginator.pageIndex = 0);
  }

  isSearchMatch(issue:StudentDetails):boolean{
    const searchStr = (issue.StudentID + issue.FirstName + issue.City + issue.Mobile).toLowerCase();
    return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<StudentDetails[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this._exampleDatabase.dataChange,
      this._sort.sortChange,
      this._filterChange,
      this._paginator.page
    ];

    if(this._req.academicID && this._req.classID  && this._req.sectionID ){
      this._exampleDatabase.getStudentDetails(this._req);
    }
    return merge(...displayDataChanges).pipe(map( () => {
        // Filter data
        this.filteredData = this._exampleDatabase.data.slice().filter((issue: StudentDetails) => {
          return (issue && issue.StudentID && this.isSearchMatch(issue));
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
  sortData(data: StudentDetails[]): StudentDetails[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';

      switch (this._sort.active) {
        case 'StudentID': [propertyA, propertyB] = [a.StudentID, b.StudentID]; break;
        case 'FirstName': [propertyA, propertyB] = [a.FirstName, b.FirstName]; break;
        case 'City': [propertyA, propertyB] = [a.City, b.City]; break;
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
    });
  }
}
