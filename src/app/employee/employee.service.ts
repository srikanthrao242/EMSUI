import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import Employee from '../models/employees';
import { config } from '../Config';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  userId = JSON.parse(localStorage.getItem('currentUser')).id;

  private employeeUrl = `${config.server.serverURL}/api/employees/${this.userId}`;

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

  addEmployees(employeeDetails) {
    return this.http.post(`${this.employeeUrl}/add-employee`, employeeDetails);
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
