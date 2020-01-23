import { Component, OnInit, ViewChild, ViewChildren, QueryList, ChangeDetectorRef } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MatSort, MatTable, MatTableDataSource } from '@angular/material';
import { ClassSections } from 'src/app/models/classesAndSections';
import { StudentClassService } from '../student-class.service';
import Academic from 'src/app/models/academics';
import { AcademicService } from 'src/app/academic/academic.service';

@Component({
  selector: 'app-list-classes',
  templateUrl: './list-classes.component.html',
  styleUrls: ['./list-classes.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ListClassesComponent implements OnInit {

  @ViewChild('outerSort', { static: true }) sort: MatSort;
  @ViewChildren('innerSort') innerSort: QueryList<MatSort>;
  @ViewChildren('innerTables') innerTables: QueryList<MatTable<ClassSections>>;

  dataSource: MatTableDataSource<ClassSectionDataSource>;
  usersData: ClassSectionDataSource[] = [];
  columnsToDisplay = ['ClassName', 'NumberOfSections', 'Fee' , 'FeeType','actions'];
  innerDisplayedColumns = ['SectionName', 'TakeCarer', 'RoomDetails', 'actions'];
  expandedElement: ClassSectionDataSource | null;
  academicsNames : Academic[];
  isSubmit = false;
  selectedAcademic:string;

  constructor(
    private cd: ChangeDetectorRef,
    private studentClassService: StudentClassService,
    private academicService: AcademicService
  ) { }

  ngOnInit() {
    this.academicService.getAllAcademicNames().subscribe(
      data => this.academicsNames = data,
      error => console.error('There was an error!', error)
    );
  }

  onSubmitAcademic(){
    if(this.selectedAcademic){
      this.isSubmit = true;
      this.studentClassService.getClassSections(+this.selectedAcademic)
      .subscribe(
        response => {
          (<ClassSectionDataSource[]>response).forEach(user => {
              if (user.sections && Array.isArray(user.sections) && user.sections.length) {
                this.usersData = [...this.usersData, {...user, sections: new MatTableDataSource(user.sections)}];
              } else {
                this.usersData = [...this.usersData, user];
              }
            });
            this.dataSource = new MatTableDataSource(this.usersData);
            this.dataSource.sort = this.sort;
        })
    }

  }

  toggleRow(element: ClassSectionDataSource) {
    element.sections && (element.sections as MatTableDataSource<ClassSections>).data.length ? (this.expandedElement = this.expandedElement === element ? null : element) : null;
    this.cd.detectChanges();
    this.innerTables.forEach((table, index) => (table.dataSource as MatTableDataSource<ClassSections>).sort = this.innerSort.toArray()[index]);
  }

  applyFilter(filterValue: string) {
    this.innerTables.forEach((table, index) => (table.dataSource as MatTableDataSource<ClassSections>).filter = filterValue.trim().toLowerCase());
  }

}

export interface ClassSectionDataSource {
  ClassName: string;
  NumberOfSections: number;
  Fee: number;
  FeeType:string;
  sections?: ClassSections[] | MatTableDataSource<ClassSections>;
}
