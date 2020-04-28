import { Observable } from 'rxjs';
import { Authentication } from './../models/authentication';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';
import { JwtHelperService } from '@auth0/angular-jwt';
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  private readonly API_URL: string = environment.userURL;

  public authenticate(authentication: Authentication): Observable<User>{
    return this.http.post<User>(this.API_URL + '/authenticate', authentication);
  }

  public register(user: User): Observable<User>{
    return this.http.post<User>(this.API_URL + '/register', user);
  }

  public getOneUser(userId: number): Observable<User>{
    return this.http.get<User>(this.API_URL +'/'+ userId);
  }

  public logout() {
    localStorage.removeItem('token');
  }

  public getLoggedIdUser(){
    let token = localStorage.getItem('token');
    let decoded = jwt_decode(token); 
    return +decoded.unique_name;
  }


}
