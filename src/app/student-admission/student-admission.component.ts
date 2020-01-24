import { Component, OnInit } from '@angular/core';
import Academic from '../models/academics';
import { AcademicService } from '../academic/academic.service';
import { StudentClassService } from '../student-classes/student-class.service';
import { Classes, ClassSections } from '../models/classesAndSections';
import { EmsUtilService } from '../emlsUtil/ems-util.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-student-admission',
  templateUrl: './student-admission.component.html',
  styleUrls: ['./student-admission.component.css']
})
export class StudentAdmissionComponent implements OnInit {

  selectedAcademic:string;
  selectedClass:string;
  selectedSection:string;
  academicsNames : Academic[];
  classes : Classes[];
  sections: ClassSections[];
  imageToShow = '../../assets/images/icons8-user-male-skin-type-5-50.png';
  isImageLoading = false;
  studentProfileImage:string;

  constructor(private academicService: AcademicService,
    private studentClassService: StudentClassService,
    private emsUtilService: EmsUtilService) { }

  ngOnInit() {
    this.academicService.getAllAcademicNames().subscribe(
      data => this.academicsNames = data,
      error => console.error('There was an error!', error)
    );
  }

  onChangeAcademic(){
    this.studentClassService.getClasses(+this.selectedAcademic).subscribe(
      data => this.classes = data,
      error => console.error('There was an error!', error)
    );
  }

  onChangeClass(){
    this.studentClassService.getSections(+this.selectedClass).subscribe(
      data => this.sections = data,
      error => console.error('There was an error!', error)
    );
  }

  prepareParent(){

  }

  prepareStudent(){

  }


  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      var filePath = event.target.files[0];

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
          this.emsUtilService.loadImage(filePath)
            .subscribe(
            data => {
              if(data instanceof HttpResponse){
                console.log("successfully loaded file", data);
                this.studentProfileImage = (<HttpResponse<any>>data).body.fileName;
                this.imageToShow = event.target["result"];
              }
            },
            error => {
              console.log(error);
            });

      }
    }
  }
}
