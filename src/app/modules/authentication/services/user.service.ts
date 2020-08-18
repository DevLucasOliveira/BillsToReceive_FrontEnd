import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  private readonly url: string = environment.apiURL;

  public authenticate(user: any){
    return this.http.post(`${this.url}/v1/users/authenticate`, user);
  }

  public register(user: any){
    return this.http.post(`${this.url}/v1/users/register`, user);
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
