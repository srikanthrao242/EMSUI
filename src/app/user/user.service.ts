import { Injectable } from '@angular/core';
import {UsreRegisterSchema, User} from '../models/user'
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpRequest} from '@angular/common/http';
import {config} from '../Config'
import {BehaviorSubject, Observable, of} from 'rxjs';
import { Company } from '../companies/CompaniesUtil';
import { addDaysFromDate} from '../helpers/util';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  king = 'UserService'

  private userUrl = config.server.serverURL + '/api/users';
  private userImgUrl = config.server.serverURL + '/api/user-profile';

  private companyUrl = config.server.serverURL + '/api/company-logo';

  dataChange: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);


  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'multipart/form-data' })
  };


  dialogData: any;

  constructor(private http: HttpClient) { }

  get data(): User[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  prepareAddUser(user:User){
    user.isActive = true;
    user.usertype = "admin"
    user.registerdate = addDaysFromDate(new Date(), 0);
    user.registrationexp = addDaysFromDate(new Date(), 30);
    user.companyid = 6;
    return user;
  }

  prepareRegisterUserAndCompany(input:  UsreRegisterSchema){
    var register = {
      'user' : {} as User,
      'company': {} as Company
    }
    register.user.name = input.name;
    register.user.email = input.email;
    register.user.address = input.address;
    register.user.city = input.city;
    register.user.isActive = true;
    register.user.mobile = input.mobile;
    register.user.profileimg = input.profileimg;
    register.user.usertype = "admin"
    register.user.registerdate = addDaysFromDate(new Date(), 0);
    register.user.password = input.password;
    register.user.registrationexp = addDaysFromDate(new Date(), input.numberofdays);

    register.company.companyname = input.companyname;
    register.company.email = input.email;
    register.company.address = input.address;
    register.company.city = input.city;
    register.company.isActive = true;
    register.company.mobile = input.mobile;
    register.company.whatsup = input.whatsup;
    register.company.numberofdays = input.numberofdays;
    register.company.comapnylogo = input.comapnylogo;
    register.company.registerdate = addDaysFromDate(new Date(), 0);
    register.company.registrationexp = addDaysFromDate(new Date(), input.numberofdays);

    return register;

  }

  loadImage(from:string, filePath){

    const formData = new FormData();
    formData.append('image', filePath);

    const params = new HttpParams();

    const options = {
        params,
        reportProgress: true,
    };
    var urlImg = `${this.userImgUrl}`;

    if(from == "cl"){
      urlImg = `${this.companyUrl}`;
    }
    const req = new HttpRequest('POST', `${urlImg}`, formData, options);
    return this.http.request(req);
  }

  register(registerInputs:UsreRegisterSchema){
    return this.http.post(`${this.userUrl}/register`, this.prepareRegisterUserAndCompany(registerInputs));
  }




  /** GET users from the server */
  getUsers (): void {
    this.http.get<User[]>(this.userUrl).subscribe(data => {
      this.dataChange.next(data);
    },
    (error: HttpErrorResponse) => {
      console.log(error);
      catchError(this.handleError<Company[]>('getCompanies', []));
    });
  }



  /** GET user by id. Will 404 if id not found */
  getUser(id: number): Observable<Company> {
    const url = `${this.userUrl}/${id}`;
    return this.http.get<Company>(url).pipe(
      catchError(this.handleError<Company>(`getUser id=${id}`))
    );
  }

    //////// Save methods //////////

  /** POST: add a new user to the server */
  addUser (user: User): void {
    console.log(this.prepareAddUser(user));
    this.http.post<User>(this.userUrl, this.prepareAddUser(user))
    .subscribe(
      (val) => {
          console.log("successful value returned in body", val);
      },
      response => {
          console.log(" error", response);
      },
      () => {
          console.log("observable is now completed.");
      });
  }

  /** DELETE: delete the user from the server */
  deleteUser (user: User | number): void {
    const id = typeof user === 'number' ? user : user.id;
    const url = `${this.userUrl}/${id}`;
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

  /** PUT: update the user on the server */
  updateUser (user: User): Observable<any> {
    return this.http.put(this.userUrl, user, this.httpOptions).pipe(
      catchError(this.handleError<any>('updateUser'))
    );
  }

  activateOrDeactivate(id: number, isActivate:boolean){
    const url = `${this.userUrl}/${id}/activation`;
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
