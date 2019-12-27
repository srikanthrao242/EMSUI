
import { Validators } from '@angular/forms';

export interface User{
  kind: "User",
  address: string,
  city: string,
  name: string,
  email: string,
  mobile: string,
  id: number,
  registerdate: string,
  registrationexp: string,
  companyid: number,
  usertype: string,
  profileimg: string,
  signature: string,
  createdby: number,
  isActive: boolean,
  password: string,
  whatsup: string
}

export interface UserColumnsSchema{
  name: string,
  label: string,
  type: string,
  validators: Validators[]
}

export interface UsreRegisterSchema{
  name: string
  address: string
  city: string
  mobile: string
  email: string
  registerdate: string
  registrationexp: string
  companyid: string
  usertype: string
  profileimg: string
  signature: string
  createdby: string
  isActive: boolean
  password: string
  companyname: string
  numberofdays: number
  whatsup: string
  comapnylogo: string
}


export interface AddUserSchema{
  name: string,
  placeholder: string,
  type:string
}

export const addUser: AddUserSchema[] = [
  { name: 'name', placeholder: 'Name', type:'text'},
  { name: 'address', placeholder: 'Address', type:'text'},
  { name: 'city', placeholder: 'City', type:'text'},
  { name: 'mobile', placeholder: 'Mobile', type:'text'},
  { name: 'email', placeholder: 'Email', type:'text'},
  { name: 'whatsup', placeholder: 'whatsup', type:'text'}
]


export const UserColumnsDesc: UserColumnsSchema[] = [
  { name: 'id', label: 'id' , type:'number',validators: ['']},
  { name: 'name', label: 'Name', type: 'text' , validators: ['', Validators.required]},
  { name: 'address', label: 'Address', type: 'text' , validators: ['', Validators.required]},
  { name: 'city', label: 'City', type: 'text' , validators: ['', Validators.required]},
  { name: 'mobile', label: 'Mobile' , type: 'text', validators: ['', [Validators.min(10), Validators.required]]},
  { name: 'email', label: 'Email', type: 'text' , validators:  ['', [Validators.required,Validators.email]]},
  { name: 'registerdate', label: 'Registered Date' , type: 'text', validators: ['']},
  { name: 'registrationexp', label: 'Registration Exp Date', type: 'text' , validators: ['']},
  { name: 'companyid', label: 'Company Name' , type: 'text', validators: ['']},
  { name: 'usertype', label: 'User Type' , type: 'text', validators: ['']},
  { name: 'profileimg', label: 'Profile' , type: 'text', validators: ['']},
  { name: 'signature', label: 'Signature' , type: 'text', validators: ['']},
  { name: 'createdby', label: 'Created By', type: 'text' , validators: ['']},
  { name: 'isActive', label: 'Is Active' , type: 'text', validators: ['']},
  { name: 'whatsup', label: 'whatsup' , type: 'text', validators: ['']},
  { name: 'password', label: 'Password' , type: 'password', validators: ['', [Validators.required, Validators.minLength(6)]]}
];

export default UserColumnsDesc
