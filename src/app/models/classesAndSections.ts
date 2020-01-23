export interface Classes{
  kind:'Classes';
  ClassID:number;
  ClassName: string;
  AcademicID: number;
  NumberOfSections: number;
  Fee: number;
  FeeType:string;
}

export interface ClassSections{
  kind: 'ClassSections';
  SectionID: number;
  SectionName: string;
  TakeCarer: number;
  RoomDetails: string;
  ClassID:number;
}
