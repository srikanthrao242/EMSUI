import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import Employee, { Salary, BankDetails } from '../models/employees';
import { config } from '../Config';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  user = JSON.parse(localStorage.getItem('currentUser'));

  userId = this.user.id;

  private employeeUrl = `${config.server.serverURL}/api/employees/${this.userId}`;

  private salaryUrl = `${config.server.serverURL}/api/salaries/${this.userId}`;

  private bankUrl = `${config.server.serverURL}/api/banks/${this.userId}`;

  dataChange: BehaviorSubject<Employee[]> = new BehaviorSubject<Employee[]>([]);

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': '*/*', 'Access-Control-Allow-Methods' : 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Origin': config.server.serverURL  })
  };

  dialogData: any;

  constructor(private http: HttpClient) { }

  get data(): Employee[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  /** GET Employees from the server */
  getEmployees (): void {
    this.http.get<Employee[]>(this.employeeUrl).subscribe(data => {
      this.dataChange.next(data);
    },
    (error: HttpErrorResponse) => {
      console.log(error);
      catchError(this.handleError<Employee[]>('getEmployees', []));
    });
  }

  getEmployeeProfile(id:number) {
    return this.http.get<Employee>(`${this.employeeUrl}/employee/${id}`);
  }

  getSalaryByEmpId(id:number){
    return this.http.get<Salary>(`${this.salaryUrl}/salary/${id}`);
  }

  getBankDetailsByEmpId(id:number){
    return this.http.get<BankDetails>(`${this.bankUrl}/bank/${id}`);
  }

  addEmployees(employeeDetails) {
    return this.http.post(`${this.employeeUrl}/add-employee`, employeeDetails);
  }

  updateEmployeeProfile(emp:Employee){
    return this.http.put<any>(`${this.employeeUrl}`, emp);
  }

  updateSalaryProfile(sal:Salary){
    return this.http.put<any>(`${this.salaryUrl}`, sal);
  }

  updateBankProfile(bank:BankDetails){
    return this.http.put<any>(`${this.bankUrl}`, bank);
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
