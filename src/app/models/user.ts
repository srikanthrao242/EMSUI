export interface User{
  address: string,
  city: string,
  name: string,
  email: string,
  mobile: string,
  id: number,
  registerdate: Date,
  registrationexp: Date,
  companyid: number,
  usertype: string,
  profileimg: string,
  signature: string,
  createdby: number,
  isActive: boolean,
  password: string
}

export interface UserColumnsSchema{
  name: string,
  label: string
}

export const UserColumnsDesc: UserColumnsSchema[] = [
  { name: 'id', label: 'id' },
  { name: 'name', label: 'Name' },
  { name: 'address', label: 'Address' },
  { name: 'city', label: 'City' },
  { name: 'mobile', label: 'Mobile' },
  { name: 'email', label: 'Email' },
  { name: 'registerdate', label: 'Registered Date' },
  { name: 'registrationexp', label: 'Registration Exp Date' },
  { name: 'companyid', label: 'Company Name' },
  { name: 'usertype', label: 'User Type' },
  { name: 'profileimg', label: 'Profile' },
  { name: 'signature', label: 'Signature' },
  { name: 'createdby', label: 'Created By' },
  { name: 'isActive', label: 'Is Active' },
  { name: 'password', label: 'Password' },

];

export default UserColumnsDesc
