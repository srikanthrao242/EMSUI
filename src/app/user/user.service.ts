import { Injectable } from '@angular/core';
import {UsreRegisterSchema, User} from '../models/user'
import { HttpClient} from '@angular/common/http';
import {config} from '../Config'
import {BehaviorSubject} from 'rxjs';
import { Company } from '../companies/CompaniesUtil';
import {addDaysFromDate} from '../helpers/util'

@Injectable({
  providedIn: 'root'
})
export class UserService {


  private userUrl = config.server.serverURL + '/api/users';

  dataChange: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);


  constructor(private http: HttpClient) { }

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


  register(registerInputs:UsreRegisterSchema){
    return this.http.post(`${this.userUrl}/register`, this.prepareRegisterUserAndCompany(registerInputs));
  }

  getAll() {
      return this.http.get<User[]>(`${this.userUrl}`);
  }

  delete(id: number) {
      return this.http.delete(`/users/${id}`);
  }

}
