import { Validators } from '@angular/forms'

export interface Academic{
  kind: 'Academic',
  AcademicID: number,
  AcademicName:string,
  StartDate:string,
  EndYear:number,
  EndDate:string,
  UserID:number,
  IsActive:boolean,
  IsCurrentAcademic:boolean
}

export interface AcademicColumnsSchema{
  name: string,
  label: string,
  type: string,
  validators: Validators[]
}



export const displayedColumns = ['AcademicID', 'AcademicName', 'StartDate', 'EndYear', 'EndDate','CurrentAcademic','Active']

export const AcademicColumnsDesc : AcademicColumnsSchema[] =[
  {name:'AcademicID', label: 'Academic ID', type: 'string', validators:['', Validators.required]},
  {name:'AcademicName', label: 'Academic Name', type: 'string', validators:['', Validators.required]},
  {name : 'StartDate', label: 'Academic Start Date', type: 'string', validators: ['', Validators.required]},
  {name: 'EndYear', label: 'Academic End Year', type: 'string', validators:['', Validators.required]},
  {name: 'EndDate', label:'Academic End Date', type: 'string', validators:['']},
  {name: 'IsCurrentAcademic', label: 'Is Current Academic Year', type: 'string', validators:['', Validators.required]}
]

export default Academic
