
import { Validators } from '@angular/forms';
export interface Company{
  id : number,
  companyname:string,
  address:String,
  city: string,
  mobile: string,
  email: string,
  numberofdays:number,
  registerdate: string,
  registrationexp: string,
  whatsup: string,
  isActive: boolean,
  comapnylogo:string
}

export interface ColumnsSchema{
  name: string,
  label: string,
  type: string,
  validators: Validators[]
}

export const columnsDesc: ColumnsSchema[] = [
  { name: 'id', label: 'id', type: 'number' ,validators: ['']},
  { name: 'companyname', label: 'Company Name', type:'text' ,validators: ['',Validators.required]},
  { name: 'address', label: 'Address' , type: 'text',validators: ['',Validators.required]},
  { name: 'city', label: 'City', type: 'text' ,validators: ['', Validators.required]},
  { name: 'mobile', label: 'Mobile', type: 'text' ,validators: ['', Validators.required]},
  { name: 'email', label: 'Email', type: 'text' ,validators: ['', Validators.required]},
  {name: 'numberofdays', label: 'Days to add', type: 'text',validators: ['']},
  {name: 'whatsup', label: 'whatsup number', type: 'text',validators: ['', [Validators.min(10), Validators.required]]},
  {name: 'isActive', label: 'isActive', type: 'text',validators: ['']},
  { name: 'registerdate', label: 'Registered Date' , type: 'text',validators: ['']},
  { name: 'registrationexp', label: 'Registration Exp Date', type: 'text' ,validators: ['']},
  { name: 'comapnylogo', label: 'company logo', type: 'text' ,validators: ['']}
];

export default columnsDesc
