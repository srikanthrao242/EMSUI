import { Validators } from '@angular/forms'

export interface Employee{
  kind: "Employee",
  id : number,
  firstName: string,
  middleName : string,
  lastName : string,
  gender :string,
  dateOfJoining : string,
  dateOfRelieving : string,
  email:string,
  mobile:string,
  city:string,
  address:string,
  companyId:number,
  designation:string,
  employeeType:string,
  qualification:string,
  isActive:boolean,
  employeeProfile:string
}

export interface Salary{
  kind: "Salary",
  id :number ,
  employeeId : number,
  salaryPerHour: number ,
  salaryPerMon : number,
  allowance : number,
  allowanceDesc :string,
  deduction :number,
  deductionDesc :string,
  taxPercentage :number,
  salAfterTax :number,
  salBeforeTax :number,
  tax :number,
  comments :string
}

export interface BankDetails{
  king: "BankDetails",
  id :number,
  employeeId: number,
  bankName :string,
  branchCode:string,
  accNo:string
}


export interface EmployeeColumnsSchema{
  name: string,
  label: string,
  type: string,
  validators: Validators[]
}

export const displayedColumns = ['id', 'firstName', 'lastName', 'dateOfJoining', 'email', 'mobile','city', 'designation','employeeType','actions']

export const EmployeeProfileColumnsDesc : EmployeeColumnsSchema[] =[
  {name:'firstName', label: 'First Name', type: 'string', validators:['', Validators.required]},
  {name : 'lastName', label: 'Last Name', type: 'string', validators: ['', Validators.required]},
  {name: 'middleName', label: 'Middle Name', type: 'string', validators:['']},
  {name: 'gender', label:'Gender', type: 'string', validators:['', Validators.required]},
  {name: 'dateOfJoining', label: 'Date Of Joining', type: 'date', validators:['', Validators.required]},
  {name: 'dateOfRelieving', label: 'Date Of Relieving', type: 'date', validators:['']},
  {name: 'email', label: 'Contact Email', type:'string', validators:['', [Validators.required, Validators.email]]},
  {name: 'mobile', label: 'Contact Mobile', type:'String', validators:['',[Validators.required, Validators.minLength(10)]]},
  {name: 'city', label: 'City', type:'string', validators: ['', Validators.required]},
  {name: 'address', label: 'Address', type: 'string', validators:['', Validators.required]},
  {name:'designation', label:'Designation', type:'string', validators:['', Validators.required]},
  {name:'employeeType', label: 'Type Of Employee', type: 'string', validators:['', Validators.required]},
  {name: 'qualification', label: 'Qualification', type:'string', validators:['', Validators.required]}
]

export const SalaryColomnDesc : EmployeeColumnsSchema[] =[
  {name: 'salaryPerHour', label: 'Salary / Hour', type:'number', validators:['', [Validators.required, Validators.min(0)]]},
  {name: 'salaryPerMon', label: 'Salary / Month', type:'number', validators:['', [Validators.required, Validators.min(0)]]},
  {name: 'allowance', label: 'Allowance', type:'number', validators:['', [Validators.required, Validators.min(0)]]},
  {name: 'allowanceDesc', label: 'Allowance Description', type:'string', validators:['', Validators.required]},
  {name: 'deduction', label: 'Deduction', type:'number', validators:['', [Validators.required, Validators.min(0)]]},
  {name: 'deductionDesc', label: 'Deduction Description', type:'string', validators:['', Validators.required]},
  {name: 'taxPercentage', label: 'Tax Percentage', type:'number', validators:['',[Validators.required, Validators.min(0)]]},
  {name: 'salAfterTax', label: 'Salary After Tax', type:'number', validators:['', [Validators.required, Validators.min(0)]]},
  {name: 'salBeforeTax', label: 'Salary Befor Tax', type:'number', validators:['', [Validators.required, Validators.min(0)]]},
  {name: 'tax', label: 'Total Tax', type:'number', validators:['', [Validators.required, Validators.min(0)]]},
  {name: 'comments', label: 'Comments', type:'string', validators:['']}
]

export const BankColumnDesc : EmployeeColumnsSchema[] =[
  {name: 'bankName', label: 'Bank Name', type:'string', validators:['', Validators.required]},
  {name: 'branchCode', label: 'Branch Code', type:'string', validators:['', Validators.required]},
  {name: 'accNo', label: 'Account Number', type:'string', validators:['', Validators.required]}
]

export const EmployeeColumnsDesc: EmployeeColumnsSchema[] = [
  { name: 'id', label: 'id' , type:'number',validators: ['']},
  {name:'firstName', label: 'First Name', type: 'string', validators:['', Validators.required]},
  {name : 'lastName', label: 'Last Name', type: 'string', validators: ['', Validators.required]},
  {name: 'middleName', label: 'Middle Name', type: 'string', validators:['']},
  {name: 'gender', label:'Gender', type: 'string', validators:['', Validators.required]},
  {name: 'dateOfJoining', label: 'Date Of Joining', type: 'date', validators:['', Validators.required]},
  {name: 'dateOfRelieving', label: 'Date Of Relieving', type: 'date', validators:['']},
  {name: 'email', label: 'Contact Email', type:'string', validators:['', [Validators.required, Validators.email]]},
  {name: 'mobile', label: 'Contact Mobile', type:'String', validators:['',[Validators.required, Validators.minLength(10)]]},
  {name: 'city', label: 'City', type:'string', validators: ['', Validators.required]},
  {name: 'address', label: 'Address', type: 'string', validators:['', Validators.required]},
  {name:'designation', label:'Designation', type:'string', validators:['', Validators.required]},
  {name:'employeeType', label: 'Type Of Employee', type: 'string', validators:['', Validators.required]},
  {name: 'qualification', label: 'Qualification', type:'string', validators:['', Validators.required]},
  {name: 'salaryPerHour', label: 'Salary / Hour', type:'number', validators:['', [Validators.required, Validators.min(0)]]},
  {name: 'salaryPerMon', label: 'Salary / Month', type:'number', validators:['', [Validators.required, Validators.min(0)]]},
  {name: 'allowance', label: 'Allowance', type:'number', validators:['', [Validators.required, Validators.min(0)]]},
  {name: 'allowanceDesc', label: 'Allowance Description', type:'string', validators:['', Validators.required]},
  {name: 'deduction', label: 'Deduction', type:'number', validators:['', [Validators.required, Validators.min(0)]]},
  {name: 'deductionDesc', label: 'Deduction Description', type:'string', validators:['', Validators.required]},
  {name: 'taxPercentage', label: 'Tax Percentage', type:'number', validators:['',[Validators.required, Validators.min(0)]]},
  {name: 'salAfterTax', label: 'Salary After Tax', type:'number', validators:['', [Validators.required, Validators.min(0)]]},
  {name: 'salBeforeTax', label: 'Salary Befor Tax', type:'number', validators:['', [Validators.required, Validators.min(0)]]},
  {name: 'tax', label: 'Total Tax', type:'number', validators:['', [Validators.required, Validators.min(0)]]},
  {name: 'comments', label: 'Comments', type:'string', validators:['']},
  {name: 'bankName', label: 'Bank Name', type:'string', validators:['', Validators.required]},
  {name: 'branchCode', label: 'Branch Code', type:'string', validators:['', Validators.required]},
  {name: 'accNo', label: 'Account Number', type:'string', validators:['', Validators.required]}
];


export interface EmpSalBank{
  employee: Employee,
  salary : Salary,
  bankDetails: BankDetails
}


export default Employee
