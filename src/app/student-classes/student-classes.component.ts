import { Component, OnInit } from '@angular/core';
import { AcademicService } from '../academic/academic.service';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { Academic } from '../models/academics';
import { StudentClassService } from './student-class.service';

@Component({
  selector: 'app-student-classes',
  templateUrl: './student-classes.component.html',
  styleUrls: ['./student-classes.component.css']
})
export class StudentClassesComponent implements OnInit {

  dynamicForm: FormGroup;
  submitted = false;
  academicsNames : Academic[];
  sectionFormControl: any = {};

  constructor(private academicService:AcademicService, private studentClassSer : StudentClassService,  private formBuilder: FormBuilder) { }

  ngOnInit() {
      this.dynamicForm = this.formBuilder.group({
          AcademicID:['', Validators.required],
          numberOfClasses: ['', Validators.required],
          classes: new FormArray([]),
          sections:new FormArray([])
      });
      this.academicService.getAllAcademicNames().subscribe(
        data => this.academicsNames = data,
        error => console.error('There was an error!', error)
      );
  }

  // convenience getters for easy access to form fields
  get f() { return this.dynamicForm.controls; }
  get t() { return this.f.classes as FormArray; }
  get s() { return this.f.sections as FormArray; }
  getSections(id:number) { return this.sectionFormControl[id] as FormArray; }

  onChangeClasses(e) {
      const numberOfTickets = e.target.value || 0;
      if (this.t.length < numberOfTickets) {
          for (let i = this.t.length; i < numberOfTickets; i++) {
              this.t.push(this.formBuilder.group({
                  ClassName: ['', Validators.required],
                  NumberOfSections: ['', [Validators.required]],
                  FeeType:['',[Validators.required]],
                  Fee : ['',[Validators.required]]
              }));
              this.sectionFormControl[i] = [];
          }
      } else {
          for (let i = this.t.length; i >= numberOfTickets; i--) {
              this.t.removeAt(i);
              if(this.sectionFormControl.hasOwnProperty(i))
                delete this.sectionFormControl[i];
          }
      }
  }

  onChangeSections(e, id:number) {
    const numberOfTickets = e.target.value || 0;
    if(this.sectionFormControl.hasOwnProperty(id))
    if (this.sectionFormControl[id].length < numberOfTickets) {
        for (let i = this.sectionFormControl[id].length; i < numberOfTickets; i++) {
            if(this.sectionFormControl.hasOwnProperty(id)){
              const fb = this.formBuilder.group({
                            SectionName: ['', Validators.required],
                            TakeCarer: [],
                            RoomDetails: ['', Validators.required]
                          });
              this.sectionFormControl[id].push(fb);
            }
        }
    } else {
        for (let i = this.sectionFormControl[id].length; i >= numberOfTickets; i--) {
            this.sectionFormControl[id].splice(i, 1);
        }
    }
  }

 prepareInputForClassesSections(){
  var academicID = +this.dynamicForm.value.AcademicID;
  return this.dynamicForm.value.classes.map((clas, i)=>{
    clas["AcademicID"] = academicID;
    var r ={"classes" : clas, "sections" : [] };
    if(this.sectionFormControl.hasOwnProperty(i)){
      r.sections = this.sectionFormControl[i].map(v=> v.value);
    }
    return r;
  });
 }



  onSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      if (this.dynamicForm.invalid) {
          return;
      }
      var sections = {};
      var loopExit = false;
      for(var key in this.sectionFormControl){
        sections[key]  = [];
        this.sectionFormControl[key].forEach(element => {
            if(element.invalid){
                loopExit = true;
                return;
            }else{
                sections[key].push(element.value.name);
            }
        });
        if(loopExit){
            return;
        }
      }

      this.studentClassSer.addClassSections(this.prepareInputForClassesSections())

  }

  onReset() {
      // reset whole form back to initial state
      this.submitted = false;
      this.dynamicForm.reset();
      this.t.clear();
      this.s.clear();
      this.sectionFormControl = {};
  }

  onClear() {
      // clear errors and reset ticket fields
      this.submitted = false;
      this.t.reset();
      this.s.reset();
      this.sectionFormControl = {};
  }


}
