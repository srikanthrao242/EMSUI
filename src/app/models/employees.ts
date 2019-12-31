import { Validators } from '@angular/forms'

export interface Employee{
  kind: "Employee",
  id : number,
  firstName: string,
  middleName : string,
  lastName : string,
  gender :string,
  dateOfJoining : Date,
  dateOfRelieving : Date,
  email:string,
  mobile:string,
  city:string,
  address:string,
  companyId:number,
  designation:string,
  employeeType:string,
  qualification:string
}


export interface EmployeeColumnsSchema{
  name: string,
  label: string,
  type: string,
  validators: Validators[]
}

export const displayedColumns = ['id','firstName', 'lastName', 'dateOfJoining', 'email', 'mobile','city', 'designation','employeeType','actions']


export const EmployeeColumnsDesc: EmployeeColumnsSchema[] = [
  { name: 'id', label: 'id' , type:'number',validators: ['']},
  {name:'firstName', label: 'First Name', type: 'string', validators:['']},
  {name : 'lastName', label: 'Last Name', type: 'string', validators: ['']},
  {name: 'middleName', label: 'Middle Name', type: 'string', validators:['']},
  {name: 'gender', label:'Gender', type: 'string', validators:['']},
  {name: 'dateOfJoining', label: 'Date Of Joining', type: 'date', validators:['']},
  {name: 'dateOfRelieving', label: 'Date Of Relieving', type: 'date', validators:['']},
  {name: 'email', label: 'Contact Email', type:'string', validators:['']},
  {name: 'mobile', label: 'Contact Mobile', type:'String', validators:['']},
  {name: 'city', label: 'City', type:'string', validators: ['']},
  {name: 'address', label: 'Address', type: 'string', validators:['']},
  {name:'designation', label:'Designation', type:'string', validators:['']},
  {name:'employeeType', label: 'Type Of Employee', type: 'string', validators:['']},
  {name: 'qualification', label: 'Qualification', type:'string', validators:['']}
];


export default Employee
