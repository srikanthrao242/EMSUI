import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { NotificationService } from '../toastr-notification/toastr-notification.service';
import StudentDetails, { ParentDetails } from '../models/students';
import { StudentClassService } from '../student-classes/student-class.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-student-edit',
  templateUrl: './student-edit.component.html',
  styleUrls: ['./student-edit.component.css']
})
export class StudentEditComponent implements OnInit {

  row:any;
  dataForm:FormGroup;
  imageToShow;
  isImageLoading = true;
  url_profile ;
  queryParams : any;
  constructor(private router:ActivatedRoute, private notificationservice: NotificationService, private studentServices: StudentClassService) { }

  ngOnInit() {
    this.dataForm = new FormGroup({
      ID: new FormControl(),
      StudentID: new FormControl(),
      FirstName: new FormControl(),
      LastName: new FormControl(),
      DOB: new FormControl(),
      BloodGroup: new FormControl(),
      Gender: new FormControl(),
      FatherName:new FormControl(),
      MotherName:new FormControl(),
      FatherOccupation:new FormControl(),
      FatherQualification: new FormControl(),
      MotherOccupation:new FormControl(),
      MotherQualification: new FormControl(),
      Religion: new FormControl(),
      Address:new FormControl(),
      City: new FormControl(),
      State: new FormControl(),
      PinCode:new FormControl(),
      Country:new FormControl(),
      Mobile: new FormControl(),
      Email: new FormControl(),
      ProfileImage: new FormControl(),
      IsActive : new FormControl()
   });
    this.row = this.router
      .queryParams
      .subscribe(params => {
        this.queryParams = params;
        this.f.ID.setValue(+params.ID);
        this.f.StudentID.setValue(+params.StudentID);
        this.f.ProfileImage.setValue(params.ProfileImage);
        this.url_profile = params.ProfileImage;
        this.f.FirstName.setValue(params.FirstName);
        this.f.LastName.setValue(params.LastName);
        this.f.DOB.setValue(params.DOB);
        this.f.BloodGroup.setValue(params.BloodGroup);
        this.f.Gender.setValue(params.Gender);
        this.f.FatherName.setValue(params.FatherName);
        this.f.MotherName.setValue(params.MotherName);
        this.f.FatherOccupation.setValue(params.FatherOccupation);
        this.f.FatherQualification.setValue(params.FatherQualification);
        this.f.MotherOccupation.setValue(params.MotherOccupation);
        this.f.MotherQualification.setValue(params.MotherQualification);
        this.f.Religion.setValue(params.Religion);
        this.f.Address.setValue(params.Address);
        this.f.City.setValue(params.City);
        this.f.State.setValue(params.State);
        this.f.PinCode.setValue(params.PinCode);
        this.f.Country.setValue(params.Country);
        this.f.Mobile.setValue(params.Mobile);
        this.f.Email.setValue(params.Email);
        this.f.IsActive.setValue(params.IsActive);
      });
  }

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url
      var filePath = event.target.files[0];
      reader.onload = (event) => { // called once readAsDataURL is completed
          this.url_profile = event.target["result"];
          this.studentServices.loadImage(filePath)
          .subscribe(
              data => {
                if(data instanceof HttpResponse){
                  this.notificationservice.success("image loaded successfully");
                  this.imageToShow = (<HttpResponse<any>>data).body.fileName;
                  this.url_profile = event.target["result"];
                }
              },
              error => {
                console.log(error);
              });
      }
    }
  }

  createStudent(data: any): StudentDetails {
    var result = {} as StudentDetails;
    result.StudentID = (+data.StudentID);
    result.FirstName = data.FirstName;
    result.LastName = data.LastName;
    result.DOB = data.DOB;
    result.BloodGroup = data.BloodGroup;
    result.Gender = data.Gender;
    result.Religion = data.Religion;
    result.Address = data.Address;
    result.City = data.City;
    result.Country = data.Country;
    result.State = data.State;
    result.PinCode = data.PinCode;
    result.Mobile = data.Mobile;
    result.Email = data.Email;
    result.IsActive = Boolean(data.IsActive);
    result.ProfileImage = this.imageToShow;
    return result;
  }

  createParent(data:any):ParentDetails {
    var result = {} as ParentDetails;
    result.ID = (+data.ID);
    result.FatherName = data.FatherName;
    result.MotherName = data.MotherName;
    result.FatherOccupation = data.FatherOccupation;
    result.FatherQualification = data.FatherQualification;
    result.StudentID = data.StudentID;
    result.Religion = data.Religion;
    result.Address = data.Address;
    result.City = data.City;
    result.Country = data.Country;
    result.State = data.State;
    result.PinCode = data.PinCode;
    result.Mobile = data.Mobile;
    result.Email = data.Email;
    result.MotherOccupation = data.MotherOccupation;
    result.MotherQualification = data.MotherQualification;
    return result;
  }

  updateStudent(){
    var data = this.dataForm.value;
    var parent = this.createParent(data);
    var student = this.createStudent(data);
    this.studentServices.updateStudentDetails(parent, student);
  }

  get f() { return this.dataForm.controls; }

}
