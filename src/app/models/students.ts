export default interface StudentDetails{
  kind:'StudentDetails',
  StudentID: number,
  FirstName: string,
  LastName: string,
  DOB: string,
  BloodGroup: string,
  Gender: string,
  Religion: string,
  Address: string,
  City: string,
  State: string,
  PinCode: string,
  Mobile: string,
  Country: string,
  Email: string,
  IsActive: boolean,
  ProfileImage: string
}


export interface ParentDetails{
  kind:'ParentDetails',
  ID: number,
  FatherName: string,
  MotherName: string,
  FatherOccupation: string,
  FatherQualification: string,
  StudentID: number,
  Religion: string,
  Address: string,
  City: string,
  State: string,
  PinCode: string,
  Country: string,
  Mobile: string,
  Email: string,
  MotherOccupation:string,
  MotherQualification:string
}

export interface StudentAdmissionRequest{
  kind: 'StudentAdmissionRequest'
}
