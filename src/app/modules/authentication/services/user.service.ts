import { UserRegister } from '../models/user-register';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as jwt_decode from 'jwt-decode';
import { UserLogin } from '@shared/models';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  private readonly API_URL: string = environment.apiURL;

  public authenticate(user: UserLogin): Observable<UserLogin>{
    return this.http.post<UserLogin>(this.API_URL + '/User/authenticate', user);
  }

  public register(user: UserRegister): Observable<UserRegister>{
    return this.http.post<UserRegister>(this.API_URL + '/User/register', user);
  }

  // public getOneUser(userId: number): Observable<User>{
  //   return this.http.get<User>(this.API_URL +'/User/'+ userId);
  // }

  public logout() {
    localStorage.removeItem('token');
  }

  public getLoggedIdUser(){
    let token = localStorage.getItem('token');
    let decoded = jwt_decode(token);
    return +decoded.unique_name;
  }


}
