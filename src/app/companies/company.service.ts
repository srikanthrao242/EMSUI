import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import {config} from '../Config'

import {Company} from './CompaniesUtil'

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  kind = 'CompanyService'

  private companyUrl = config.server.serverURL + '/api/companies';

  dataChange: BehaviorSubject<Company[]> = new BehaviorSubject<Company[]>([]);

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': '*/*', 'Access-Control-Allow-Methods' : 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Origin': config.server.serverURL  })
  };

  dialogData: any;

  constructor(private http: HttpClient) { }

  get data(): Company[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  addDays(ds: string, days: number) : string {
    const d = new Date(ds);
    return new Date(d.setDate(d.getDate() + days)).toISOString().replace("T", " ").replace("Z","");
  }


  /** GET companies from the server */
  getCompanies (): void {
    this.http.get<Company[]>(this.companyUrl).subscribe(data => {
      this.dataChange.next(data);
    },
    (error: HttpErrorResponse) => {
      console.log(error);
      catchError(this.handleError<Company[]>('getCompanies', []));
    });
  }


  /** GET Company by id. Return `undefined` when id not found */
  getCompanyNo404<Data>(id: number): Observable<Company> {
    const url = `${this.companyUrl}/?id=${id}`;
    return this.http.get<Company[]>(url)
      .pipe(
        map(companies => companies[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
        }),
        catchError(this.handleError<Company>(`getCompany id=${id}`))
      );
  }

  /** GET Company by id. Will 404 if id not found */
  getCompany(id: number): Observable<Company> {
    const url = `${this.companyUrl}/${id}`;
    return this.http.get<Company>(url).pipe(
      catchError(this.handleError<Company>(`getCompany id=${id}`))
    );
  }

    //////// Save methods //////////

  /** POST: add a new company to the server */
  addCompany (company: Company): void {
    company.registerdate = new Date().toISOString().replace("T", " ").replace("Z","");
    company.registrationexp = this.addDays(company.registerdate,company.numberofdays);
    this.http.post<Company>(this.companyUrl, company)
    .subscribe(
      (val) => {
          console.log("DELETE call successful value returned in body", val);
      },
      response => {
          console.log("DELETE call in error", response);
      },
      () => {
          console.log("The DELETE observable is now completed.");
      });
  }

  /** DELETE: delete the company from the server */
  deleteCompany (company: Company | number): void {
    const id = typeof company === 'number' ? company : company.id;
    const url = `${this.companyUrl}/${id}`;
    this.http.delete(url)
          .subscribe(
              (val) => {
                  console.log("DELETE call successful value returned in body", val);
              },
              response => {
                  console.log("DELETE call in error", response);
              },
              () => {
                  console.log("The DELETE observable is now completed.");
              });
  }

  /** PUT: update the company on the server */
  updateCompany (company: Company): Observable<any> {

    if(company.numberofdays && company.registerdate){
      company.registrationexp = this.addDays(company.registerdate,company.numberofdays);
    }

    return this.http.put(this.companyUrl, company, this.httpOptions).pipe(
      catchError(this.handleError<any>('updateHero'))
    );
  }

  activateOrDeactivate(id: number, isActivate:boolean){
    const url = `${this.companyUrl}/${id}/activation`;
    return this.http.put(url,{isActivate:isActivate});
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
