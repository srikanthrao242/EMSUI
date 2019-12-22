
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
  isActive: boolean
}

export interface ColumnsSchema{
  name: string,
  label: string
}

export const columnsDesc: ColumnsSchema[] = [
  { name: 'id', label: 'id' },
  { name: 'companyname', label: 'Company Name' },
  { name: 'address', label: 'Address' },
  { name: 'city', label: 'City' },
  { name: 'mobile', label: 'Mobile' },
  { name: 'email', label: 'Email' },
  {name: 'numberofdays', label: 'Days to add'},
  {name: 'whatsup', label: 'whatsup number'},
  {name: 'isActive', label: 'isActive'},
  { name: 'registerdate', label: 'Registered Date' },
  { name: 'registrationexp', label: 'Registration Exp Date' }
];

export default columnsDesc
