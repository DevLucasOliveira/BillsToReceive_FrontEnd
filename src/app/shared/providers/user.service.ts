import { Observable } from 'rxjs';
import { Authentication } from './../models/authentication';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  private readonly API_URL: string = environment.userURL;

  public authenticate(authentication: Authentication): Observable<User>{
    return this.httpClient.post<User>(this.API_URL + '/authenticate', authentication);
  }

  public register(user: User): Observable<User>{
    return this.httpClient.post<User>(this.API_URL + '/register', user);
  }

}
